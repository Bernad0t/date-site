from sqlalchemy import ForeignKey

from backend.src.base_data.engine import Base
from sqlalchemy.orm import Mapped, mapped_column, relationship

from backend.src.base_data.enums.gender import Gender
from backend.src.base_data.enums.status_like import StatusLike


class PartnerOrm(Base):
    __tablename__ = "Partner"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    user_id: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="CASCADE"))
    gender: Mapped[Gender]
    ageFrom: Mapped[int]
    ageTo: Mapped[int]


class LikePartnerOrm(Base):
    __tablename__ = "LikePartner"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    liked_user_id: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="CASCADE"))
    liked_by_id: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="CASCADE"))
    status: Mapped[StatusLike]


#  TODO messages