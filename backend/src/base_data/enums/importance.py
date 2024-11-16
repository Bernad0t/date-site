import enum

class Importance(enum.Enum):
    necessarily_yes = 5,
    important_yes = 4,
    more_yes = 3,
    neutral = 1,
    more_no = -3,
    necessarily_no = -5