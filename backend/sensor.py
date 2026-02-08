import google.generativeai as genai
from config import GEMINI_API_KEY

genai.configure(api_key=GEMINI_API_KEY)

def run_sensor(dataset, context):
    prompt = f"""
HYLE CORE 2.4 – Nodo di mente ad alveare ATTIVATO

Dataset:
{dataset}

Contesto:
{context}

=== COMPITI ===
1. Identifica pattern ricorrenti
2. Assegna risonanza 0–5
3. Evidenzia anomalie e conflitti

=== OUTPUT ===
Pattern 1: ...
Risonanza: ...
Note: ...

Anomalie: ...
Conflitti: ...
"""

    model = genai.GenerativeModel("gemini-pro")
    response = model.generate_content(prompt)
    return response.text
