from fastapi import HTTPException
from jose import jwt, exceptions

from backend.src.config import SECRET_KEY_TOKEN, ALGORITHM


def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET_KEY_TOKEN, ALGORITHM)
    except exceptions.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="X-Token header invalid")
    except:
        raise HTTPException(status_code=409, detail="X-Token header invalid")