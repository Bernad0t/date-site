from fastapi import UploadFile
from pydantic import BaseModel, EmailStr

from backend.src.base_data.enums.gender import Gender
from backend.src.sqhemas.profile import CharacteristicsListDTO


class UserBase(BaseModel):
    """ Формирует тело ответа с деталями пользователя """
    id: int
    mail: EmailStr
    gender: Gender | None
    name: str | None
    age: int | None
    description: str | None
    preview: str | None
    characteristics: list[CharacteristicsListDTO]

class UploadFileUser(UserBase):
    file: UploadFile | None
