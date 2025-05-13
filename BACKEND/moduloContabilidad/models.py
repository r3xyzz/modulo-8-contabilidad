from django.db import models

# Create your models here.
class CuentaContable(models.Model):
    IdCuenta = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    nombreCuenta = models.CharField(db_column='nombreCuenta', max_length=500)  # Field name made lowercase.
    tipoCuenta = models.CharField(db_column='tipoCuenta', max_length=500)  # Field name made lowercase.
    codigoCuenta = models.CharField(db_column='codigoCuenta', max_length=600)  # Field name made lowercase.
    descripcionCuenta = models.TextField(db_column='descripcionCuenta')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CuentaContable'

class AsientoContable(models.Model):
    IdAsiento = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    fechaAsiento = models.DateField(db_column='fechaAsiento')  # Field name made lowercase.
    descripcionAsiento = models.TextField(db_column='descripcionAsiento')  # Field name made lowercase.
    referenciaAsiento = models.CharField(db_column='referenciaAsiento', max_length=500)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AsientoContable'

class DetalleAsiento(models.Model):
    IdDetalle = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    debe = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    haber = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    idAsiento = models.ForeignKey('Asientocontable', on_delete=models.CASCADE, db_column='idAsiento_id')  # Field name made lowercase.
    idCuenta = models.ForeignKey('Cuentacontable', on_delete=models.CASCADE, db_column='idCuenta_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DetalleAsiento'

class Transaccion(models.Model):
    IdTransaccion = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    tipoTransaccion = models.CharField(db_column='tipoTransaccion', max_length=500)  # Field name made lowercase.
    montoTransaccion = models.DecimalField(db_column='montoTransaccion', max_digits=10, decimal_places=5)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    fechaTransaccion = models.DateField(db_column='fechaTransaccion')  # Field name made lowercase.
    idAsiento = models.ForeignKey('Asientocontable', on_delete=models.CASCADE, db_column='idAsiento_id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Transaccion'