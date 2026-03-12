from dotenv import load_dotenv
load_dotenv()

import os
import asyncpg
from fastapi import FastAPI

from app.routes import ward
from app.routes import festival
from app.routes import festival_waste
from app.routes import prediction
from app.routes import waste

print("Gemini Key Loaded:", os.getenv("GEMINI_API_KEY"))

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ===============================
# DATABASE CONNECTION (IMPORTANT)
# ===============================

DATABASE_URL = os.getenv("DATABASE_URL")
# example:
# postgres://user:password@host:5432/dbname


@app.on_event("startup")
async def startup():
    app.state.pool = await asyncpg.create_pool(
        DATABASE_URL,
        min_size=1,
        max_size=5
    )
    print("✅ Database pool created")


@app.on_event("shutdown")
async def shutdown():
    await app.state.pool.close()
    print("❌ Database pool closed")


# ===============================
# ROOT
# ===============================

@app.get("/")
def root():
    return {"status": "Backend running successfully"}


# ===============================
# ROUTERS
# ===============================

app.include_router(ward.router)
app.include_router(festival.router)
app.include_router(festival_waste.router)
app.include_router(prediction.router)
app.include_router(waste.router)