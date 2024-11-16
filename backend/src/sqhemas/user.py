from pydantic import BaseModel, EmailStr

from backend.src.base_data.enums.gender import Gender


class UserBase(BaseModel):
    """ Формирует тело ответа с деталями пользователя """
    id: int
    mail: EmailStr
    gender: Gender | None
    name: str | None
    age: int | None
    description: str | None