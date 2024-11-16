from pydantic import BaseModel

from backend.src.base_data.enums.characteristic import CharacteristicType

class AnswerDTO(BaseModel):
    id: int
    id_characteristic: int
    answer: str

class CharacteristicsListDTO(BaseModel):
    id: int
    name: str
    type_characteristic: CharacteristicType
    answers: list[AnswerDTO]