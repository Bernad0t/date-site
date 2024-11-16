from fastapi import HTTPException
from sqlalchemy import select, update

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.models.user import UserOrm


async def find_user_by_id(id: int) -> UserOrm:
    async with async_session_factory() as session:
        query = (
            select(UserOrm)
            .where(UserOrm.id == id)
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
