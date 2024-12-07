import enum

class StatusLike(int, enum.Enum):
    not_checked = 0
    like = 1
    dislike = 2