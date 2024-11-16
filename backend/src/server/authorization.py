from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from starlette import status
from starlette.responses import Response

from backend.src.base_data.queries.authorization import Register, Login
from backend.src.base_data.queries.user import find_user_by_id
from backend.src.sqhemas.authorization import UserCreate
from backend.src.utils.token import verify_token

router = APIRouter(
    prefix="/auth",
    tags=["auth"],
)

@router.get("/is-active")
async def active_user(token: Annotated[str, Depends(verify_token)]):
    result = await find_user_by_id(token["id"])
    if not result:
        return False
    return True


@router.post("/sign-up")
async def create_user(user: UserCreate):
    dict_tokens = await Register(user)
    # response.set_cookie(key="refresh_token", value=refresh_token, max_age=2000000, secure=False, httponly=False)
    return dict_tokens

@router.post("/sign-in")
async def login_user(user: UserCreate, response: Response):
    dict_tokens = await Login(user)
    # response.set_cookie(key="refresh_token", value=dict_tokens["refresh_token"])
    return dict_tokens