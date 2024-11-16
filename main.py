from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI

from backend.src.server import authorization, user, profile

app = FastAPI(
# title="My App",
#     description="Description of my app.",
#     version="1.0",
#     docs_url='/docs',
#     openapi_url='/openapi.json', # This line solved my issue, in my case it was a lambda function
#     redoc_url=None
)

origins = ["http://localhost:3000", "http://localhost:3001"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(authorization.router)
app.include_router(user.router)
app.include_router(profile.router)

@app.on_event("startup")
async def startup():
    print("start")
    # awazit create_tables() # TODO потом удали
