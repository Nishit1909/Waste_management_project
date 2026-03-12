from fastapi import APIRouter
from app.schemas import PredictionInput, PredictionResponse
from app.services.ml_service import predict_waste
from app.services.llm_service import generate_explanation

router = APIRouter()

@router.post("/predict-with-explanation", response_model=PredictionResponse)
def predict(data: PredictionInput):

    features = [
        data.ward_name,
        data.festival,
        data.year,
        data.population,
        data.festival_duration_days
    ]

    prediction_dict = predict_waste(features)

    explanation = generate_explanation(prediction_dict)

    return {
        **prediction_dict,
        "explanation": explanation
    }
# from fastapi import APIRouter
# from app.schemas import PredictionInput, PredictionResponse
# from app.services.ml_service import predict_waste
# from app.services.llm_service import generate_explanation

# router = APIRouter()
# @router.post("/predict-with-explanation", response_model=PredictionResponse)
# def predict(data: PredictionInput):

#     print("ROUTE FUNCTION EXECUTED")

#     features = [
#         data.ward_name,
#         data.festival,
#         data.year,
#         data.population,
#         data.festival_duration_days
#     ]

#     prediction_dict = predict_waste(features)

#     print("ABOUT TO CALL LLM")

#     explanation = generate_explanation(prediction_dict)

#     print("LLM FINISHED")

#     return {
#         **prediction_dict,
#         "explanation": explanation
#     }
# @router.post("/predict-with-explanation", response_model=PredictionResponse)
# def predict(data: PredictionInput):

#     features = [
#         data.ward_name,
#         data.festival,
#         data.year,
#         data.population,
#         data.festival_duration_days
#     ]

#     prediction_dict = predict_waste(features)

#     explanation = generate_explanation(prediction_dict)

#     return {
#         **prediction_dict,
#         "explanation": explanation
#     }
# @router.post("/predict-with-explanation", response_model=PredictionResponse)
# def predict(data: PredictionInput):

#     prediction_dict = predict_waste(
#         data.ward_name,
#         data.festival,
#         data.year,
#         data.population,
#         data.festival_duration_days
#     )

#     return {
#         **prediction_dict,
#         "explanation": "ML working test"
#     }
# @router.post("/predict-with-explanation", response_model=PredictionResponse)
# def predict(data: PredictionInput):
#     try:
#         features = [
#             data.ward_name,
#             data.festival,
#             data.year,
#             data.population,
#             data.festival_duration_days
#         ]

#         prediction_dict = predict_waste(features)

#         explanation = generate_explanation(
#             prediction_dict,
#             data.ward_name,
#             data.festival
#         )

#         return {
#             **prediction_dict,
#             "explanation": explanation
#         }

#     except Exception as e:
#         raise Exception(f"ML/LLM Error: {str(e)}")