import requests
from django.core.management.base import BaseCommand
from moduloContabilidad.models import AsientoContable, DetalleAsiento, Transaccion

class Command(BaseCommand):
    help = 'Importa compras y las transforma en asientos contables'

    def handle(self, *args, **kwargs):
        id_inventarios = 5  # ID de la cuenta Inventarios
        id_caja = 3         # ID de la cuenta Caja Principal

        url = 'http://34.238.247.153:8000/api/'
        response = requests.get(url)
        compras = response.json()

        for compra in compras:
            monto = float(compra['precio_compra'])

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