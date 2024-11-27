from backend.src.base_data.queries.partner import get_ankets
from backend.src.sqhemas.user import UserBase


async def get_foreign_profile(id: int):
    users = [UserBase.model_validate(anket, from_attributes=True) for anket in await get_ankets(id)]
    return users

