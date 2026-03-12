from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database import SessionLocal
from ..models import Ward
from ..schemas import WardResponse

router = APIRouter()


# -------------------------
# DB Dependency
# -------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -------------------------
# GET ALL WARDS
# -------------------------
@router.get("/wards", response_model=list[WardResponse])
def get_wards(db: Session = Depends(get_db)):
    return db.query(Ward).all()