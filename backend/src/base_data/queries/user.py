from fastapi import HTTPException
from sqlalchemy import select, update
from sqlalchemy.orm import contains_eager

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.models.user import UserOrm, CharacteristicsOrm, AnswerOrm, AnswUserCharOrm
from backend.src.sqhemas.user import UserBase


async def find_user_by_id(id: int) -> UserOrm:
    async with async_session_factory() as session:
        query = (
            select(UserOrm)
            .where(UserOrm.id == id)
            .join(UserOrm.characteristics)
            .join(CharacteristicsOrm.answers)
            .options(
                contains_eager(UserOrm.characteristics).contains_eager(CharacteristicsOrm.answers)
            )
            .filter(
                AnswerOrm.id.in_(
                    select(AnswUserCharOrm.answer_id)
                    .where(AnswUserCharOrm.user_id == id)
                )
            )
        )
        result = await session.execute(query)
        return result.scalars().first()

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