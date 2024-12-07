from fastapi import HTTPException
from sqlalchemy import select, update, or_
from sqlalchemy.orm import contains_eager, selectinload

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.models.user import UserOrm, CharacteristicsOrm, AnswerOrm, AnswUserCharOrm
from backend.src.sqhemas.user import UserBase


async def find_user_by_id(id: int) -> UserOrm:
    async with async_session_factory() as session:
        query = (
            select(UserOrm)
            .where(UserOrm.id == id)
            .join(UserOrm.characteristics, isouter=True)
            .join(UserOrm.answers, isouter=True)
            .options(
                contains_eager(UserOrm.characteristics).contains_eager(CharacteristicsOrm.answers), contains_eager(UserOrm.answers)
            )
        )
        result = (await session.execute(query)).unique().scalars().first()
        # if result is None:
        #     query = (
        #         select(UserOrm)
        #         .where(UserOrm.id == id)
        #         .options(
        #             selectinload(UserOrm.characteristics)
        #         )
        #     )
        #     result = (await session.execute(query)).unique().scalars().first()
        print(result)
        return result

async def find_user_by_login(login: str) -> UserOrm:
    async with async_session_factory() as session:
        query = (
            select(UserOrm)
            .where(UserOrm.login == login)
        )
        result = await session.execute(query)
        return result.scalars().first()


async def set_user_data_query(data: UserBase):
    data_dict = data.dict()
    data_dict.pop("answers")
    data_dict.pop("characteristics")
    print(data_dict)
    async with async_session_factory() as session:
        query = (
            update(UserOrm)
            .where(UserOrm.id == data.id)
            .values(**data_dict)
        )
        await session.execute(query)
        await session.commit()