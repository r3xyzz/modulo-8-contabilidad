import requests
from django.core.management.base import BaseCommand
from moduloContabilidad.models import AsientoContable, DetalleAsiento, Transaccion

class Command(BaseCommand):
    help = 'Importa ventas y las transforma en asientos contables'

    def handle(self, *args, **kwargs):
        id_inventarios = 5  # ID de la cuenta Inventarios
        id_caja = 3         # ID de la cuenta Caja Principal

        url = 'http://107.20.12.19/api/productos/'
        response = requests.get(url)
        productos = response.json()

        for producto in productos:
            try:
                monto = float(producto['precio'])
            except (ValueError, TypeError):
                self.stdout.write(self.style.ERROR(
                    f"Producto ID {producto.get('id', 'desconocido')} tiene un precio no numérico: {producto.get('precio')}. Se omite."
                ))
                continue

            # 1. Crear AsientoContable
            asiento = AsientoContable.objects.create(
                fechaAsiento='2024-06-20',  # Puedes ajustar la fecha según tu lógica
                descripcionAsiento=f"Venta de producto {producto['nombre']}",
                referenciaAsiento=f"Producto ID {producto['id']}"
            )

            # 2. Crear DetalleAsiento (Debe: Caja Principal, Haber: Inventarios)
            DetalleAsiento.objects.create(
                idAsiento=asiento,
                idCuenta_id=id_caja,
                debe=monto,
                haber=0
            )
            DetalleAsiento.objects.create(
                idAsiento=asiento,
                idCuenta_id=id_inventarios,
                debe=0,
                haber=monto
            )

            # 3. Crear Transaccion
            Transaccion.objects.create(
                idAsiento=asiento,
                tipoTransaccion='venta',
                montoTransaccion=monto,
                fechaTransaccion='2024-06-20'  # Ajusta la fecha si es necesario
            )

            self.stdout.write(self.style.SUCCESS(f'Producto {producto["id"]} importado como asiento {asiento.idAsiento}'))