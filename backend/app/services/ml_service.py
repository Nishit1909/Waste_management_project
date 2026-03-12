import joblib
import os
import pandas as pd

MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "..",
    "mysuru_waste_pipeline11.pkl"
)

model = joblib.load(MODEL_PATH)


def predict_waste(features: list):

    columns = [
        "ward_name",
        "festival",
        "year",
        "population",
        "festival_duration_days"
    ]

    input_df = pd.DataFrame([features], columns=columns)

    prediction = model.predict(input_df)

    organic = float(prediction[0][0])
    plastic = float(prediction[0][1])
    metal   = float(prediction[0][2])

    compost = organic * 0.55
    biogas  = organic * 0.30
    recyclable_metal = metal * 0.90

    total_waste = organic + plastic + metal

    return {
        "organic_tons": round(organic, 2),
        "plastic_tons": round(plastic, 2),
        "metal_tons": round(metal, 2),

        "compost_tons": round(compost, 2),
        "biogas_tons": round(biogas, 2),
        "recyclable_metal_tons": round(recyclable_metal, 2),

        "festival_total_waste_tons": round(total_waste, 2)
    }