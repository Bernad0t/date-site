from sqlalchemy import select, and_, func, update, insert, or_
from sqlalchemy.orm import contains_eager, selectinload

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.enums.status_like import StatusLike
from backend.src.base_data.models.partner import LikePartnerOrm
from backend.src.base_data.models.user import UserOrm, CharacteristicsOrm, AnswerOrm, AnswUserCharOrm

def query_getusers():
    query = (
        select(UserOrm)
        .options(
            selectinload(UserOrm.characteristics).selectinload(CharacteristicsOrm.answers),
            selectinload(UserOrm.answers)
        )
    )
    return query
async def get_ankets(id: int):
    async with async_session_factory() as session:
        query = (
            query_getusers() # те, кто его лайкал, даже если он отвечал на этот лайк, будут попадаться. мб исправить?
            .where(and_(
                UserOrm.id.notin_(
                    select(LikePartnerOrm.liked_user_id)
                    .where(LikePartnerOrm.liked_by_id == id)
                ), UserOrm.id != id
            ))
            .limit(10)
        )
        return (await session.execute(query)).unique().scalars().all()


async def process_score(liked_user: int, liked_by: int, result_like: StatusLike):
    async with async_session_factory() as session:
        query = (
            select(LikePartnerOrm)
            .where(or_(and_(LikePartnerOrm.liked_by_id == liked_by, LikePartnerOrm.liked_user_id == liked_user),
                   and_(LikePartnerOrm.liked_by_id == liked_user, LikePartnerOrm.liked_user_id == liked_by)))
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


async def get_likes(id: int):
    async with async_session_factory() as session:
        query = (
            query_getusers()
            .where(UserOrm.id.in_(
                select(LikePartnerOrm.liked_by_id)
                .where(and_(LikePartnerOrm.liked_user_id == id, LikePartnerOrm.status == StatusLike.not_checked))
            ))
        )
        result = (await session.execute(query)).scalars().all()
        return result
