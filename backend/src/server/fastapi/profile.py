from typing import Annotated

from fastapi import APIRouter, Depends

from backend.src.base_data.queries.profile import get_list_characteristics, get_user_answers, set_user_answers
from backend.src.services.user import get_user_data
from backend.src.sqhemas.profile import CharacteristicsListDTO
from backend.src.utils.token import verify_token

router = APIRouter(
    prefix="/profile",
    tags=["profile"],
)

@router.get("/get-characteristics")
async def get_characteristics():
    return await get_list_characteristics()


@router.get("/get-answers")
async def get_answers(token: Annotated[dict, Depends(verify_token)]):
    return await get_user_answers(token["id"])


@router.post("/set-answers")
async def set_answers(characteristics: list[CharacteristicsListDTO], token: Annotated[dict, Depends(verify_token)]):
    await set_user_answers(token["id"], characteristics)