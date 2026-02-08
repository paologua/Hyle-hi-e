import streamlit as st
from backend.orchestrator import run_hive

st.title("HYLE HIVE 2.4 — Sistema Cognitivo Distribuito")

dataset = st.text_area("Dataset locale")
context = st.text_input("Contesto")
project = st.text_area("Descrizione progetto")

if st.button("Esegui HIVE"):
    output = run_hive(dataset, context, project)

    st.subheader("Nodo Pattern (Sensor)")
    st.write(output["sensor"])

    st.subheader("Nodo Economico (Processor)")
    st.write(output["processor"])

    st.subheader("Aggregato")
    st.write(output["aggregated"])

    st.subheader("Decisione Finale (Actuator)")
    st.write(output["final"])
