from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column

from backend.src.base_data.engine import Base


class RefreshTokenOrm(Base):
    __tablename__ = "RefreshToken"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    User_id: Mapped[int] = mapped_column(ForeignKey("User.id", ondelete="CASCADE"))
    Token: Mapped[str]