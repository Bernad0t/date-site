import random
import string

from fastapi import UploadFile

from backend.src.base_data.queries.user import find_user_by_id, set_user_data_query
from backend.src.s3_client import check_exist_file, upload_file, delete_file_s3, get_file_source
from backend.src.sqhemas.user import UserBase, UploadFileUser


async def get_user_data(id: int):
    user_orm = await find_user_by_id(id)
    return UserBase.model_validate(user_orm, from_attributes=True)


async def set_user_data(user: UserBase, file: UploadFile | None):
    filename = "".join(random.choices(string.ascii_lowercase, k=20))
    print(user)
    if not file is None:
        while (await check_exist_file(filename + file.content_type)):
            filename = "".join(random.choices(string.ascii_lowercase, k=20))
        await upload_file(file.file, filename)
        if not user.preview is None:
            print(user.preview, "prew")
            await delete_file_s3(user.preview)
        user.preview = get_file_source(filename)
    try:
        await set_user_data_query(user)
    except:
        if not file is None:
            await delete_file_s3(filename + file.content_type)
        raise
