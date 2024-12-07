from sqlalchemy import select, and_, func, update, insert
from sqlalchemy.orm import contains_eager, selectinload

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.enums.status_like import StatusLike
from backend.src.base_data.models.partner import LikePartnerOrm
from backend.src.base_data.models.user import UserOrm, CharacteristicsOrm, AnswerOrm, AnswUserCharOrm


async def get_ankets(id: int):
    async with async_session_factory() as session:
        query = (
            select(UserOrm)
            .where(and_(
                UserOrm.id.notin_(
                    select(LikePartnerOrm.liked_user_id)
                    .where(LikePartnerOrm.liked_by_id == id)
                ), UserOrm.id != id
            ))
            .options(
                selectinload(UserOrm.characteristics).selectinload(CharacteristicsOrm.answers), selectinload(UserOrm.answers)
            )
            .limit(10)
        )
        return (await session.execute(query)).unique().scalars().all()


async def process_score(liked_user: int, liked_by: int, result_like: StatusLike):
    async with async_session_factory() as session:
        query = (
            select(LikePartnerOrm)
            .where(and_(LikePartnerOrm.liked_by_id == liked_by, LikePartnerOrm.liked_user_id == liked_user))
        )
        result = (await session.execute(query)).scalars().first()
        if result is None:
            session.add(LikePartnerOrm(liked_by_id=liked_by, liked_user_id=liked_user, status=result_like))
        else:
            query = (
                update(LikePartnerOrm)
                .where(LikePartnerOrm.id == result.id)
                .values(status=result_like)
            )
            await session.execute(query)
        await session.commit()