from pydantic import BaseModel

from backend.src.base_data.enums.characteristic import CharacteristicType

class AnswerDTO(BaseModel):
    id: int
    characteristic_id: int
    answer: str

class CharacteristicsListDTO(BaseModel):
    id: int
    name: str
    type_characteristic: CharacteristicType
    answers: list[AnswerDTO]