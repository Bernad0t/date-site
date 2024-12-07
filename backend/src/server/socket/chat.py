from backend.src.utils.token import verify_token
from main import sio


@sio.event
def connect(sid, environ, token: str):
    verify_token(token)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


@sio.event
def begin_chat(sid, id_chat):
    sio.enter_room(sid, id_chat)

@sio.event
def exit_chat(sid, id_chat):
    sio.leave_room(sid, id_chat)

@sio.event
async def send_mes(sid, ):
    pass
