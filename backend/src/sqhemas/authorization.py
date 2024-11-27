from pydantic import BaseModel, EmailStr

from backend.src.base_data.enums.gender import Gender


class UserCreate(BaseModel):
    """ Проверяет sign-up запрос """
    login: str
    password: str
    mail: EmailStr
    gender: Gender | None
    name: str | None
    age: int | None
    description: str | None

class UserLogin(BaseModel):
    login: str
    password: str
    mail: EmailStr