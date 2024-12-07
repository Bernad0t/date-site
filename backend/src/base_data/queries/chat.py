from sqlalchemy import select
from sqlalchemy.orm import selectinload, contains_eager

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.models.chat import ChatsOrm
from backend.src.base_data.models.user import UserOrm


async def get_chats(user_id: int):
    async with async_session_factory() as session:
        query = (
            select(ChatsOrm)
            .options(selectinload(ChatsOrm.users))
            .where(ChatsOrm.id.in_(
                select(UserOrm.chats)
                .where(UserOrm.id == user_id)
            ))
        )
        result = (await session.execute(query)).unique().scalars().all()
        return result