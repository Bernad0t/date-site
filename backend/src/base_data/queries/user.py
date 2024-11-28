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
            .join(CharacteristicsOrm.answers, isouter=False)
            .options(
                contains_eager(UserOrm.characteristics).contains_eager(CharacteristicsOrm.answers)
            )
            .filter(
                or_(AnswerOrm.id.in_(
                    select(AnswUserCharOrm.answer_id)
                    .where(AnswUserCharOrm.user_id == id)
                ), CharacteristicsOrm.id == None)
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
    async with async_session_factory() as session:
        query = (
            update(UserOrm)
            .where(UserOrm.id == data.id)
            .values(**data.dict())
        )
        await session.execute(query)
        await session.commit()