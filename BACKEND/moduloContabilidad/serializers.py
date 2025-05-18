from rest_framework import serializers
from .models import CuentaContable, AsientoContable, DetalleAsiento, Transaccion

class CuentaContableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaContable
        fields = ('idCuenta', 'nombreCuenta', 'tipoCuenta', 'codigoCuenta', 'descripcionCuenta')

class AsientoContableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsientoContable
        fields = ('idAsiento','fechaAsiento', 'descripcionAsiento', 'referenciaAsiento')

class DetalleAsientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleAsiento
        fields = ('idDetalle','idAsiento', 'idCuenta', 'debe', 'haber')

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = ('idTransaccion','idAsiento', 'tipoTransaccion', 'montoTransaccion', 'fechaTransaccion')