from sqlalchemy import ForeignKey

from backend.src.base_data.engine import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.base_data.enums.characteristic import CharacteristicType
from backend.src.base_data.enums.gender import Gender
from backend.src.base_data.enums.importance import Importance


class UserOrm(Base):
    __tablename__ = "User"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    login: Mapped[str]
    password: Mapped[str]
    mail: Mapped[str]
    gender: Mapped[Gender | None]
    name: Mapped[str | None]
    age: Mapped[int | None]
    description: Mapped[str | None]
    preview: Mapped[str | None]
    #TODO city

    characteristics: Mapped[list["CharacteristicsOrm"]] = relationship(
        back_populates="users",
        secondary="AnswUserChar"
    )
    answers: Mapped[list["AnswerOrm"]] = relationship(
        back_populates="users",
        secondary="AnswUserChar",
        viewonly=True
    )
    chats: Mapped[list["ChatsOrm"]] = relationship(
        back_populates="users",
        secondary="UserChats",
        viewonly=True
    )
class AnswerOrm(Base):
    __tablename__ = "Answer"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    characteristic_id: Mapped[int] = mapped_column(ForeignKey("Characteristics.id", ondelete="CASCADE"))
    answer: Mapped[str]

    users: Mapped["UserOrm"] = relationship(
        back_populates="answers",
        secondary="AnswUserChar",
        viewonly=True
    )


class AnswUserCharOrm(Base):
    __tablename__ = "AnswUserChar"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="CASCADE"))
    characteristic_id: Mapped[int] = mapped_column(ForeignKey("Characteristics.id", ondelete="CASCADE"))
    answer_id: Mapped[int] = mapped_column(ForeignKey("Answer.id", ondelete="CASCADE")) #   on 1 Quest mb many answ
    importance: Mapped[Importance]


class CharacteristicsOrm(Base): #  we create list charact and all ways answ in answ table
    __tablename__ = "Characteristics"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str]
    type_characteristic: Mapped[CharacteristicType]

    users: Mapped[list["UserOrm"]] = relationship( # надо бы max answ сделать
        back_populates="characteristics",
        secondary="AnswUserChar"
    )
    answers: Mapped[list["AnswerOrm"]] = relationship()

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