from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def run_actuator(aggregated_output):
    prompt = f"""
HYLE CORE 2.4 – Nodo Actuator

Input aggregato:
{aggregated_output}

Compito:
- sintetizza decisioni operative
- genera architettura o piano d'azione
- nessuna narrativa, solo struttura

Formato:
Decisione: ...
Azioni: ...
Note: ...
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
