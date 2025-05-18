import requests
from collections import Counter

# URL del endpoint local
API_URL = "http://localhost:8000/api/cuentascontables/"

def obtener_datos():
    try:
        response = requests.get(API_URL)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as e:
        print(f"Error al obtener los datos: {e}")
        return []

def generar_reporte(datos):
    total_cuentas = len(datos)
    tipos = [cuenta['tipoCuenta'] for cuenta in datos]
    resumen_tipos = Counter(tipos)

    print("=== REPORTE DE CUENTAS CONTABLES ===")
    print(f"Total de cuentas: {total_cuentas}")
    print("Cuentas por tipo:")
    for tipo, cantidad in resumen_tipos.items():
        print(f" - {tipo}: {cantidad}")

if __name__ == "__main__":
    datos = obtener_datos()
    if datos:
        generar_reporte(datos)
