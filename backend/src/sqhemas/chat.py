from pydantic import BaseModel


class MessageBase(BaseModel):
    send_by: int
    send_to: int
    chat_id: int
    message: str

class MessageExist(MessageBase):
    id: int