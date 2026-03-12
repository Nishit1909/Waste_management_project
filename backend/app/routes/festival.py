from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import SessionLocal
from ..models import Festival
from ..schemas import FestivalResponse

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/festivals", response_model=list[FestivalResponse])
def get_festivals(db: Session = Depends(get_db)):
    return db.query(Festival).all()