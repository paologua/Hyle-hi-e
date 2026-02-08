from backend.sensor import run_sensor
from backend.processor import run_processor
from backend.actuator import run_actuator

def run_hive(dataset, context, project_description):
    node1 = run_sensor(dataset, context)
    node2 = run_processor(project_description)

    aggregated = f"""
=== Nodo 1 ===
{node1}

=== Nodo 2 ===
{node2}
"""

    final = run_actuator(aggregated)

    return {
        "sensor": node1,
        "processor": node2,
        "aggregated": aggregated,
        "final": final
    }
