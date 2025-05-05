from rest_framework import serializers
from .models import CuentaContable, AsientoContable, DetalleAsiento, Transaccion

class CuentaContableSerializer(serializers.ModelSerializer):
    class Meta:
        model = CuentaContable
        fields = ('id', 'nombreCuenta', 'tipoCuenta', 'codigoCuenta', 'descripcionCuenta')

class AsientoContableSerializer(serializers.ModelSerializer):
    class Meta:
        model = AsientoContable
        fields = ('id', 'fechaAsiento', 'descripcionAsiento', 'referenciaAsiento')

class DetalleAsientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DetalleAsiento
        fields = ('id', 'idAsiento', 'idCuenta', 'debe', 'haber')

class TransaccionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaccion
        fields = ('id', 'idAsiento', 'tipoTransaccion', 'montoTransaccion', 'fechaTransaccion')
