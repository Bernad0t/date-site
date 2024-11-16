from backend.src.base_data.queries.user import find_user_by_id
from backend.src.sqhemas.user import UserBase


async def get_user_data(id: int):
    user_orm = await find_user_by_id(id)
    return UserBase.model_validate(user_orm, from_attributes=True)