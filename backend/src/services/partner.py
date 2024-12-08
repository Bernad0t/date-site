from backend.src.base_data.queries.partner import get_ankets, get_likes
from backend.src.sqhemas.user import UserBase


async def get_foreign_profile(id: int):
    users = [UserBase.model_validate(anket, from_attributes=True) for anket in await get_ankets(id)]
    return users


async def get_likes_service(id: int):
    users = await get_likes(id)
    if not users is None:
        users = [UserBase.model_validate(i, from_attributes=True) for i in users]
    return users
