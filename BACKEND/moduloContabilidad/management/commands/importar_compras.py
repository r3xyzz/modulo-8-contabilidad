import requests
from django.core.management.base import BaseCommand
from moduloContabilidad.models import AsientoContable, DetalleAsiento, Transaccion

class Command(BaseCommand):
    help = 'Importa compras y las transforma en asientos contables'

    def handle(self, *args, **kwargs):
        id_inventarios = 5  # ID de la cuenta Inventarios
        id_caja = 3         # ID de la cuenta Caja Principal

        url = 'http://35.153.174.128/api/compras/'
        response = requests.get(url)
        compras = [
            {
                "id": 99,
                "fecha": "2024-06-14",
                "producto": "Monitor",
                "precio_compra": "abc"
            }
        ]  # Simulación de respuesta de la API, reemplazar con response.json() en producción

        for compra in compras:
            try:
                monto = float(compra['precio_compra'])
            except (ValueError, TypeError):
                self.stdout.write(self.style.ERROR(
                    f"Compra ID {compra.get('id', 'desconocido')} tiene un precio no numérico: {compra.get('precio_compra')}. Se omite."
                ))
                continue

            # 1. Crear AsientoContable
            asiento = AsientoContable.objects.create(
                fechaAsiento=compra['fecha'][:10],
                descripcionAsiento=f"Compra de producto {compra['producto']}",
                referenciaAsiento=f"Compra ID {compra['id']}"
            )

            # 2. Crear DetalleAsiento (Debe: Inventarios, Haber: Caja Principal)
            DetalleAsiento.objects.create(
                idAsiento=asiento,
                idCuenta_id=id_inventarios,
                debe=monto,
                haber=0
            )
            DetalleAsiento.objects.create(
                idAsiento=asiento,
                idCuenta_id=id_caja,
                debe=0,
                haber=monto
            )

            # 3. Crear Transaccion
            Transaccion.objects.create(
                idAsiento=asiento,
                tipoTransaccion='compra',
                montoTransaccion=monto,
                fechaTransaccion=compra['fecha'][:10]
            )

            self.stdout.write(self.style.SUCCESS(f'Compra {compra["id"]} importada como asiento {asiento.idAsiento}'))