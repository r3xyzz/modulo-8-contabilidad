from django.db import models

# Create your models here.
class CuentaContable(models.Model):
    nombreCuenta = models.CharField(max_length=500)
    tipoCuenta = models.CharField(max_length=500)
    codigoCuenta = models.CharField(max_length=600)
    descripcionCuenta = models.TextField()

class AsientoContable(models.Model):
    fechaAsiento = models.DateField()
    descripcionAsiento = models.TextField()
    referenciaAsiento = models.CharField(max_length=500)

class DetalleAsiento(models.Model):
    idAsiento = models.ForeignKey(AsientoContable, on_delete=models.CASCADE)
    idCuenta = models.ForeignKey(CuentaContable, on_delete=models.CASCADE)
    debe = models.DecimalField(max_digits=10, decimal_places=2)
    haber = models.DecimalField(max_digits=10, decimal_places=2)

class Transaccion(models.Model):
    idAsiento = models.ForeignKey(AsientoContable, on_delete=models.CASCADE)
    tipoTransaccion = models.CharField(max_length=500)
    montoTransaccion = models.DecimalField(max_digits=10, decimal_places=2)
    fechaTransaccion = models.DateField()