from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.base_data.engine import Base
from backend.src.base_data.models.user import UserOrm


class UserChatsOrm(Base):
    __tablename__ = "UserChats"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    user_id: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="SET NULL"), nullable=True)
    chat_id: Mapped[int] = mapped_column(ForeignKey("Chats.id", ondelete="CASCADE"))

class ChatsOrm(Base):
    __tablename__ = "Chats"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    messages: Mapped[list["MessagesOrm"]] = relationship(
        back_populates="chat"
    )
    users: Mapped[list["UserOrm"]] = relationship(
        back_populates="chats",
        secondary="UserChats"
    )

class MessagesOrm(Base):
    __tablename__ = "Messages"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    send_by: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="SET NULL"), nullable=True)
    send_to: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="SET NULL"), nullable=True)
    chat_id: Mapped[int] = mapped_column(ForeignKey("Chats.id", ondelete="CASCADE"))
    message: Mapped[str]

    chat: Mapped["ChatsOrm"] = relationship(
        back_populates="messages"
    )

    users: Mapped[list] = relationship(
        back_populates="chats",
        secondary="UserChats"
    )