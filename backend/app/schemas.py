from pydantic import BaseModel
from typing import Optional

# -------------------- WARD --------------------

class WardBase(BaseModel):
    ward_name: str


class WardResponse(WardBase):
    ward_id: int

    class Config:
        from_attributes = True


# -------------------- FESTIVAL --------------------

class FestivalBase(BaseModel):
    festival_name: str


class FestivalResponse(FestivalBase):
    festival_id: int

    class Config:
        from_attributes = True


# -------------------- FESTIVAL WASTE --------------------

class FestivalWasteResponse(BaseModel):
    id: int
    ward_id: int
    festival_id: int
    year: int
    festival_total_waste_tons: Optional[float] = None

    class Config:
        from_attributes = True


# -------------------- PREDICTION --------------------

class PredictionInput(BaseModel):
    ward_name: str
    festival: str
    year: int
    population: float
    festival_duration_days: int


class PredictionResponse(BaseModel):
    organic_tons: float
    plastic_tons: float
    metal_tons: float
    compost_tons: float
    biogas_tons: float
    recyclable_metal_tons: float
    festival_total_waste_tons: float
    explanation: str