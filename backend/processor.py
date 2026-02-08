from openai import OpenAI
from config import OPENAI_API_KEY

client = OpenAI(api_key=OPENAI_API_KEY)

def run_processor(project_description):
    prompt = f"""
HYLE CORE 2.4.3-U – Nodo economico ATTIVATO

Descrizione progetto:
{project_description}

Usa il Data Layer standard (Italia) e produci:
- costi fissi
- linea di galleggiamento
- €/h minimo
- €/unità minimo
- breakeven
- kill-switch
- valutazione brutale

Formato:
Costi fissi mensili (CF): ...
Ore realistiche: ...
Valore orario minimo tecnico: ...
Valore orario professionale: ...
Linea di galleggiamento (LG): ...
Breakeven: ...
Kill-switch: ...
Valutazione brutale: ...
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
