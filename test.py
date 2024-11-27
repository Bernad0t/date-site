import asyncio

from backend.src.base_data.queries.user import find_user_by_id


async def test():
    user = await find_user_by_id(15)
    print(user.characteristics[0].answers)

asyncio.run(test())