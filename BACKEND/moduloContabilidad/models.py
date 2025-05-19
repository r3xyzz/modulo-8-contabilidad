from django.db import models

# Create your models here.
# Definimos los modelos de la base de datos para la contabilidad
# Estos modelos representan las tablas de la base de datos
# y se utilizan para interactuar con la base de datos a través de Django ORM
# Importamos el módulo models de Django para definir nuestros modelos
# Definimos la clase CuentaContable que representa la tabla CuentaContable en la base de datos
# Esta clase hereda de models.Model, lo que significa que es un modelo de Django
# La clase Meta define la configuración de la tabla en la base de datos


# TENER OJO CON LAS MAYUSCULAS Y MINUSCULAS
# Asegurarse de que los nombres de las tablas y columnas coincidan con los de la base de datos

class CuentaContable(models.Model):
    idCuenta = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    nombreCuenta = models.CharField(db_column='nombreCuenta', max_length=500)  # Field name made lowercase.
    tipoCuenta = models.CharField(db_column='tipoCuenta', max_length=500)  # Field name made lowercase.
    codigoCuenta = models.CharField(db_column='codigoCuenta', max_length=600)  # Field name made lowercase.
    descripcionCuenta = models.TextField(db_column='descripcionCuenta')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CuentaContable'

class AsientoContable(models.Model):
    idAsiento = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    fechaAsiento = models.DateField(db_column='fechaAsiento')  # Field name made lowercase.
    descripcionAsiento = models.TextField(db_column='descripcionAsiento')  # Field name made lowercase.
    referenciaAsiento = models.CharField(db_column='referenciaAsiento', max_length=500)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'AsientoContable'

class DetalleAsiento(models.Model):
    idDetalle = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    debe = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    haber = models.DecimalField(max_digits=10, decimal_places=5)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    idAsiento = models.ForeignKey('Asientocontable', on_delete=models.CASCADE, db_column='idAsiento')  # Field name made lowercase.
    idCuenta = models.ForeignKey('Cuentacontable', on_delete=models.CASCADE, db_column='idCuenta')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'DetalleAsiento'

class Transaccion(models.Model):
    idTransaccion = models.AutoField(primary_key=True)  # Especificamos que IdCuenta es la clave primaria
    tipoTransaccion = models.CharField(db_column='tipoTransaccion', max_length=500)  # Field name made lowercase.
    montoTransaccion = models.DecimalField(db_column='montoTransaccion', max_digits=10, decimal_places=5)  # Field name made lowercase. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    fechaTransaccion = models.DateField(db_column='fechaTransaccion')  # Field name made lowercase.
    idAsiento = models.ForeignKey('Asientocontable', on_delete=models.CASCADE, db_column='idAsiento')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Transaccion'

class ReporteContable(models.Model):
    idReporte = models.AutoField(db_column='idReporte', primary_key=True)
    archivoReporte = models.FileField(upload_to='reportes/', db_column='archivoReporte', blank=True, null=True)
    creacionReporte = models.DateTimeField(db_column='creacionReporte', auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'ReporteContable'

