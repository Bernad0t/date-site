from starlette.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from socketio import ASGIApp, Server

from backend.src.server.fastapi import authorization, profile, user, partner

app = FastAPI(
title="My App",
    description="Description of my app.",
    version="1.0",
    docs_url='/docs',
    openapi_url='/openapi.json', # This line solved my issue, in my case it was a lambda function
    redoc_url=None
)

origins = ["http://localhost:3000", "http://localhost:3001"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

sio = Server()

app.include_router(authorization.router)
app.include_router(user.router)
app.include_router(profile.router)
app.include_router(partner.router)

@app.on_event("startup")
async def startup():
    print("start")
    # awazit create_tables() # TODO потом удали


# Объединяем FastAPI и Socket.IO
app = ASGIApp(sio, app)
