from typing import Annotated

from fastapi import APIRouter, Depends

from backend.src.base_data.queries.profile import get_list_characteristics
from backend.src.services.user import get_user_data
from backend.src.utils.token import verify_token

router = APIRouter(
    prefix="/profile",
    tags=["profile"],
)

@router.get("/get-characteristics")
async def active_user():
    return await get_list_characteristics()