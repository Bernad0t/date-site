from sqlalchemy import select, and_
from sqlalchemy.orm import contains_eager

from backend.src.base_data.engine import async_session_factory
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
            .join(UserOrm.characteristics, isouter=True)
            # .join(CharacteristicsOrm.answers)
            .options(
                contains_eager(UserOrm.characteristics)
            )
            # .filter(
            #     AnswerOrm.id.in_(
            #         select(AnswUserCharOrm.answer_id)
            #         .where(AnswUserCharOrm.user_id == id)
            #     )
            # )
            .limit(10)
        )
        return (await session.execute(query)).unique().scalars().all()