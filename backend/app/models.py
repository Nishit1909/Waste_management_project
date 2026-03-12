from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    UniqueConstraint,
    DateTime
)
from sqlalchemy.orm import relationship
from .database import Base


# =========================
# WARDS TABLE
# =========================
class Ward(Base):
    __tablename__ = "wards"

    ward_id = Column(Integer, primary_key=True, index=True)
    ward_name = Column(String)

    environmental_data = relationship(
        "EnvironmentalData",
        back_populates="ward"
    )

    festival_data = relationship(
        "FestivalWasteData",
        back_populates="ward"
    )


# =========================
# FESTIVALS TABLE
# =========================
class Festival(Base):
    __tablename__ = "festivals"

    festival_id = Column(Integer, primary_key=True, index=True)
    festival_name = Column(String, unique=True)

    waste_data = relationship(
        "FestivalWasteData",
        back_populates="festival"
    )


# =========================
# ENVIRONMENTAL DATA
# =========================
class EnvironmentalData(Base):
    __tablename__ = "environmental_data"

    id = Column(Integer, primary_key=True, index=True)

    ward_id = Column(Integer, ForeignKey("wards.ward_id"))
    year = Column(Integer)

    temperature = Column(Float)
    rainfall = Column(Float)
    humidity = Column(Float)

    ward = relationship(
        "Ward",
        back_populates="environmental_data"
    )

    __table_args__ = (
        UniqueConstraint("ward_id", "year", name="unique_env"),
    )


# =========================
# FESTIVAL WASTE DATA
# =========================
class FestivalWasteData(Base):
    __tablename__ = "festival_waste_data"

    id = Column(Integer, primary_key=True, index=True)

    # ✅ FOREIGN KEYS ADDED
    ward_id = Column(Integer, ForeignKey("wards.ward_id"))
    festival_id = Column(Integer, ForeignKey("festivals.festival_id"))
    year = Column(Integer)

    festival_duration_days = Column(Integer)
    city_population_estimated = Column(Integer)
    city_waste_tpd_estimated = Column(Float)

    ward_daily_waste_tpd = Column(Float)
    festival_total_waste_tons = Column(Float)

    organic_tons = Column(Float)
    plastic_tons = Column(Float)
    metal_tons = Column(Float)
    compost_tons = Column(Float)
    biogas_tons = Column(Float)
    recyclable_metal_tons = Column(Float)

    previous_year_festival_waste = Column(Float)
    waste_growth_rate_percent = Column(Float)

    created_at = Column(DateTime)

    # ✅ RELATIONSHIPS (missing earlier)
    ward = relationship(
        "Ward",
        back_populates="festival_data"
    )

    festival = relationship(
        "Festival",
        back_populates="waste_data"
    )


# =========================
# FESTIVAL WASTE PREDICTIONS
# =========================
class FestivalWastePrediction(Base):
    __tablename__ = "festival_waste_predictions"

    prediction_id = Column(Integer, primary_key=True, index=True)

    ward_id = Column(Integer, ForeignKey("wards.ward_id"))
    festival_id = Column(Integer, ForeignKey("festivals.festival_id"))
    year = Column(Integer)

    predicted_waste = Column(Float)