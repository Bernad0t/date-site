from sqlalchemy import update

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.exception.authorization import USER_EXIST, UNCORRECT_DATA, USER_DONT_EXIST
from backend.src.base_data.models.token import RefreshTokenOrm
from backend.src.base_data.models.user import UserOrm
from backend.src.base_data.queries.user import find_user_by_login
from backend.src.services.authorization import authorization_service
from backend.src.sqhemas.authorization import UserCreate
from backend.src.sqhemas.token import TokensDTO
from backend.src.utils.process_password import get_hashed_password, create_refresh_token, create_access_token, \
    check_password

@authorization_service
async def Register(data: UserCreate):
    async with async_session_factory() as session:
        result = await find_user_by_login(data.login)
        if result:
            raise USER_EXIST
        hashed_password = get_hashed_password(data.password)
        data.password = hashed_password
        new_user = UserOrm(**data.dict())
        session.add(new_user)
        await session.flush()
        user_id = new_user.id
        dict_for_token = {'id': user_id}
        get_refresh_token = create_refresh_token(dict_for_token)
        refresh_token = RefreshTokenOrm(User_id=user_id, Token=get_refresh_token)
        session.add(refresh_token)
        await session.commit()
        return TokensDTO.model_validate({"access_token": create_access_token(dict_for_token),
                                         "refresh_token": get_refresh_token, "user_id": user_id})

@authorization_service
async def Login(data: UserCreate):
    async with async_session_factory() as session:
        result = await find_user_by_login(data.login)
        if not result:
            raise USER_DONT_EXIST
        if not check_password(data.password, result.password):
            raise UNCORRECT_DATA
        dict_for_token = {'id': result.id}
        refresh_token = create_refresh_token(dict_for_token)
        query = (
            update(RefreshTokenOrm)
            .where(RefreshTokenOrm.User_id == result.id)
            .values(Token=refresh_token)
        )
        await session.execute(query)
        await session.commit()
        return TokensDTO.model_validate({"access_token": create_access_token(dict_for_token),
                                         "refresh_token": refresh_token, "user_id": result.id})