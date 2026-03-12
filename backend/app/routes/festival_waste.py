from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import FestivalWasteData
from app.schemas import FestivalWasteResponse


router = APIRouter()


# ---------------------------------------------------
# GET FESTIVAL WASTE DATA
# ---------------------------------------------------
@router.get(
    "/festival-waste",
    response_model=List[FestivalWasteResponse]
)
def get_festival_waste(
    ward_id: int,
    festival_id: int,
    year: int,
    db: Session = Depends(get_db)
):
    try:
        data = db.query(FestivalWasteData).filter(
            FestivalWasteData.ward_id == ward_id,
            FestivalWasteData.festival_id == festival_id,
            FestivalWasteData.year == year
        ).all()

        if not data:
            raise HTTPException(
                status_code=404,
                detail="No festival waste data found"
            )

        return data

    except Exception as e:
        print("ERROR:", e)   # shows real error in terminal
        raise HTTPException(
            status_code=500,
            detail="Internal Server Error"
        )