from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import fetch_stats

app = FastAPI()

# CORS to allow requests from frontend (adjust port as needed)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ✅ allow everything for testing
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(fetch_stats.router)
