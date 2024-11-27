from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from starlette.responses import Response

from backend.src.base_data.queries.authorization import Register, Login
from backend.src.base_data.queries.user import find_user_by_id
from backend.src.services.partner import get_foreign_profile
from backend.src.sqhemas.authorization import UserCreate, UserLogin
from backend.src.utils.process_password import create_access_token
from backend.src.utils.token import verify_token

router = APIRouter(
    prefix="/partner",
    tags=["partner"],
)

@router.get("/ankets")
async def get_ankets_router(token: Annotated[dict, Depends(verify_token)]):
    return await get_foreign_profile(token["id"])