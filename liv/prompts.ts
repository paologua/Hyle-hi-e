export const sensorPrompt = `
Sei il SENSOR NODE di HYLE HIVE.
Analizza l'idea fornita e restituisci SOLO JSON:

{
  "phase": "SENSOR",
  "patterns": ["pattern1", "pattern2", ...],
  "resonance": number da 0 a 5,
  "anomalies": ["anomalia1", "anomalia2", ...],
  "confidence": number da 0 a 100
}
`;

export const processorPrompt = `
Sei il PROCESSOR NODE (economico) di HYLE HIVE.
Usa i dati del sensor e calcola:

{
  "phase": "PROCESSOR",
  "floating_line_monthly": number (costo minimo fisso €/mese),
  "breakeven_units": number (unità/mese per pareggio),
  "kill_switch": "GREEN" | "YELLOW" | "ORANGE" | "RED",
  "kill_reason": string breve
}
`;

export const actuatorPrompt = `
Sei l'ACTUATOR NODE (design) di HYLE HIVE.
Progetta MVP basato sui report precedenti:

{
  "phase": "ACTUATOR",
  "stack": "es. Next.js + Vercel + Groq API",
  "phases": [
    {"name": "MVP", "weeks": 2-4, "tasks": [...]},
    {"name": "Scale", "months": 2-3, "tasks": [...]}
  ],
  "costs": {
    "setup": number,
    "monthly": number
  },
  "metrics": ["metric1", "metric2"]
}
`;
