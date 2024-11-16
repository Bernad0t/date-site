from fastapi import HTTPException

from backend.src.base_data.exception.authorization import USER_EXIST, UNCORRECT_DATA, USER_DONT_EXIST


def authorization_service(authorization):
    async def auth_wrapper(*args, **kwargs):
        try:
            dict_tokens = await authorization(*args, **kwargs)
            # response.set_cookie(key="refresh_token", value=refresh_token, max_age=2000000, secure=False, httponly=False)
            return dict_tokens
        except USER_EXIST:
            raise HTTPException(400, detail="user exist")
        except USER_DONT_EXIST:
            raise HTTPException(400, detail="user not exist")
        except UNCORRECT_DATA:
            raise HTTPException(400, detail="uncorrect data")
    return auth_wrapper
