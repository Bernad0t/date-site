import asyncio

from sqlalchemy import select, delete
from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.base_data.engine import async_session_factory
from backend.src.base_data.enums.characteristic import CharacteristicType
from backend.src.base_data.models.user import CharacteristicsOrm, AnswerOrm, UserOrm


class inerface_characteristic:
    name: str
    answer: list[str]
    type_characteristic: CharacteristicType
    def __init__(self, name_characteristic: str, ways_answ: list[str], type: CharacteristicType):
        self.name = name_characteristic
        self.answer = ways_answ
        self.type_characteristic = type

    def asdict(self):
        return {
            "name": self.name,
            "answer": self.answer,
            "type": self.type
        }

def get_characteristics() -> list[inerface_characteristic]:
    return [
        inerface_characteristic(
            "Политические взгляды",
            [
                "Не интересуюсь политикой",
                "Либеральные",
                "Коммунистические",
                "Социалистические",
                "Консервативные",
                "Анархические",
                "Монархические",
                "Милитаризм",
                "Пацифизм"
            ],
            CharacteristicType.worldview
        ),
        inerface_characteristic(
            "Вы ищете",
            [
                "Свободные отношения",
                "Серьезные отношения",
                "Дружеские отношения"
            ],
            CharacteristicType.relationship
        ),
        inerface_characteristic(
            "Вредные привычки",
            [
                "Курю",
                "Пью",
                "Нет"
            ],
            CharacteristicType.yourself
        ),
        inerface_characteristic(
            "Отношение к спорту",
            [
                "Живу спортом",
                "Поддерживаю форму",
                "Иногда занимаюсь",
                "Не люблю спорт"
            ],
            CharacteristicType.yourself
        ),
        inerface_characteristic(
            "Насколько развито у вас чувство эмпатии?",
            [
                "Переживаю за других больше, чем за себя",
                "Сопереживаю другим",
                "Равнодушен"
            ],
            CharacteristicType.attract
        ),
        inerface_characteristic(
            "Как легко вы можеть перевернуть свою жизнь с ног на голову?",
            [
                "Я готов отказать от стабильности во имя своих целей",
                "Мне придется побороть себя, чтобы согласиться на что-то кардинальное",
                "Я не согласен отказываться от стабильности и предказуемости"
            ],
            CharacteristicType.worldview
        ),
        inerface_characteristic(
            "Как вы относитесь к присутствию детей в будущем?",
            [
                "Хочу иметь детей",
                "Если случится так, что будут, то я не против",
                "Не хочу иметь деетй"
            ],
            CharacteristicType.relationship
        ),
        inerface_characteristic(
            "Какого вы склада ума?",
            [
                "Творческая личность",
                "Аналитически ориентирован",
                "И творец, и физмеховец"
            ],
            CharacteristicType.yourself
        ),
        inerface_characteristic(
            "Насколько вы самоироничны?",
            [
                "Меня тяжело обидеть. Я посмеюсь с шутки, если она не сказана серьезно",
                "Я не обижусь, но хотелось бы исключить такое",
                "Меня задевают шутки надо мной"
            ],
            CharacteristicType.yourself
        ),
        inerface_characteristic(
            "Что вы цените в людях?",
            [
                "Ум",
                "Ораторское мастрество",
                "Юмор",
                "Искренность",
                "Доброту и заботу",
                "Физические характеристики",
                "Целеустремленность"
            ],
            CharacteristicType.attract
        )
    ]

async def insert_answ(session: AsyncSession, charact: inerface_characteristic, id_char: dict):
    query = (
        delete(AnswerOrm)
        .where(AnswerOrm.characteristic_id == id_char)
    )
    await session.execute(query)
    for answ in charact.answer:
        obj = AnswerOrm(answer=answ, characteristic_id=id_char)
        session.add(obj)

async def insert_to_bd(characteristics: list[inerface_characteristic]):
    async with async_session_factory() as session:
        query = (
            delete(CharacteristicsOrm)
        )
        await session.execute(query)
        for charact in characteristics:
            obj = CharacteristicsOrm(name=charact.name, type_characteristic=charact.type_characteristic)
            session.add(obj)
            await session.flush()
            await insert_answ(session, charact, obj.id)
        await session.commit()


# Без изменения loop policy на винде asyncio не работает с psycopg
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
async def insert_characteristics():
    characteristics: list[inerface_characteristic] = get_characteristics()
    await insert_to_bd(characteristics)

async def delete_users():
    async with async_session_factory() as session:
        query = (
            delete(UserOrm)
        )
        await session.execute(query)
        await session.commit()

asyncio.run(delete_users())
