from sqlalchemy import select

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.models.user import CharacteristicsOrm, UserOrm, AnswUserCharOrm
from backend.src.sqhemas.profile import CharacteristicsListDTO, AnswerDTO
from sqlalchemy.orm import selectinload

# def get_pydantic_characteristics(characteristics: list[CharacteristicsOrm]):
#     pydantic_characteristics = []
#     for charact in characteristics:
#         pydantic_answ = []
#         for answ in charact.answers:
#             pydantic_answ.append(AnswerDTO.model_validate(answ, from_attributes=True))
#         charact.answers = pydantic_answ
#         pydantic_characteristics.append(CharacteristicsListDTO.model_validate(charact, from_attributes=True))
#     return pydantic_characteristics
async def get_list_characteristics():
    async with async_session_factory() as session:
        query = (
            select(CharacteristicsOrm)
            .options(selectinload(CharacteristicsOrm.answers))
        )
        characteristics = (await session.execute(query)).scalars().all()
        # pydantic_characteristics = get_pydantic_characteristics(characteristics)
        return [CharacteristicsListDTO.model_validate(charact, from_attributes=True) for charact in characteristics]


async def get_user_answers(id_user: int):
    async with async_session_factory() as session:
        query = (
            select(UserOrm)
            .where(UserOrm.id == id_user)
            .options(
                selectinload(
                    UserOrm.characteristics.subqueryload(CharacteristicsOrm.answers.in_(
                        select(AnswUserCharOrm.answer_id)
                        .where(AnswUserCharOrm.user_id == id_user)
                    ))
                )
            )
        )
        result = (await session.execute(query)).scalars().first()
        return [CharacteristicsListDTO.model_validate(charact, from_attributes=True) for charact in result.answers]