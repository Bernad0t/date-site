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

class AnswerOrm(Base):
    __tablename__ = "Answer"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    characteristic_id: Mapped[int] = mapped_column(ForeignKey("Characteristics.id", ondelete="CASCADE"))
    answer: Mapped[str]


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