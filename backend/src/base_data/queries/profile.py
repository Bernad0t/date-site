from sqlalchemy import select, delete

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.enums.importance import Importance
from backend.src.base_data.models.user import CharacteristicsOrm, UserOrm, AnswUserCharOrm, AnswerOrm
from backend.src.sqhemas.profile import CharacteristicsListDTO, AnswerDTO
from sqlalchemy.orm import selectinload, contains_eager


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
            select(CharacteristicsOrm)
            .join(CharacteristicsOrm.answers)
            .options(
                contains_eager(CharacteristicsOrm.answers)
            )
            .filter(
                AnswerOrm.id.in_(
                    select(AnswUserCharOrm.answer_id)
                    .where(AnswUserCharOrm.user_id == id_user)
                )
            )
        )
        result = (await session.execute(query)).unique().scalars().all()
        return [CharacteristicsListDTO.model_validate(charact, from_attributes=True) for charact in result]

async def set_user_answers(id_user: int, characteristics_with_answers: list[CharacteristicsListDTO]):
    async with async_session_factory() as session:
        query = (
            delete(AnswUserCharOrm)
            .where(AnswUserCharOrm.user_id == id_user)
        )
        await session.execute(query)

        for characteristic in characteristics_with_answers:
            for answ in characteristic.answers:
                new_answ = AnswUserCharOrm(user_id=id_user, characteristic_id=characteristic.id, answer_id=answ.id,
                                           importance=Importance.neutral)
                session.add(new_answ)
        await session.commit()