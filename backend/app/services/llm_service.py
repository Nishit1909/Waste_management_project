import os
from openai import OpenAI

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_explanation(prediction_dict):
    try:
        prompt = f"""
        Waste Prediction Results:

        Organic: {prediction_dict['organic_tons']} tons
        Plastic: {prediction_dict['plastic_tons']} tons
        Metal: {prediction_dict['metal_tons']} tons
        Compost: {prediction_dict['compost_tons']} tons
        Biogas: {prediction_dict['biogas_tons']} tons
        Recyclable Metal: {prediction_dict['recyclable_metal_tons']} tons
        Total: {prediction_dict['festival_total_waste_tons']} tons

        Explain the main causes of this waste distribution.
        Then provide 3 practical mitigation strategies.
        Keep it structured and concise.
        """

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are an environmental waste management expert."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7
        )

        return response.choices[0].message.content

    except Exception as e:
        return f"LLM Error: {str(e)}"