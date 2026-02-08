# HYLE HIVE 2.4 — Sistema Cognitivo Distribuito

## Deploy rapido (iPad / Android)

### 1. Crea un nuovo repo GitHub
Carica tutti i file.

### 2. Deploy frontend (Streamlit Cloud)
- Vai su https://share.streamlit.io
- Collega il repo
- Seleziona `frontend/app.py`

### 3. Deploy backend (Render o Railway)
- Crea un nuovo servizio Python
- Punta alla cartella `backend/`
- Imposta variabili ambiente:
  - GEMINI_API_KEY
  - OPENAI_API_KEY

### 4. Usa tutto da mobile
Apri l’URL Streamlit → incolla dataset → premi “Run Hive”.

