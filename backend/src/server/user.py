from typing import Annotated

from fastapi import APIRouter, Depends

from backend.src.services.user import get_user_data
from backend.src.utils.token import verify_token

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

@router.get("/get-data")
async def active_user(token: Annotated[str, Depends(verify_token)]):
    return await get_user_data(token["id"])