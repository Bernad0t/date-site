import json
from typing import Annotated

from fastapi import APIRouter, Depends, UploadFile, Form, File

from backend.src.services.user import get_user_data, set_user_data
from backend.src.sqhemas.user import UserBase, UploadFileUser
from backend.src.utils.token import verify_token

router = APIRouter(
    prefix="/user",
    tags=["user"],
)

@router.get("/get-data")
async def get_data(token: Annotated[dict, Depends(verify_token)]):
    return await get_user_data(token["id"])

@router.post("/set-data")
async def set_data(data: Annotated[str, Form()], token: Annotated[dict, Depends(verify_token)],
                   file: UploadFile = File(None)):
    data = UserBase.model_validate(json.loads(data))
    await set_user_data(data, file)