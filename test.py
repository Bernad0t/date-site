import asyncio

from backend.src.base_data.queries.user import find_user_by_id, find_user_by_login


async def test():
    user = await find_user_by_login("aabbddss")
    print(user)

asyncio.run(test())