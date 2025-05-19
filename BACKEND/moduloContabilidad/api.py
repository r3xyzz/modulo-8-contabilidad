from .models import CuentaContable, AsientoContable, DetalleAsiento, Transaccion, ReporteContable
from rest_framework import viewsets, permissions
from .serializers import CuentaContableSerializer, AsientoContableSerializer, DetalleAsientoSerializer, TransaccionSerializer, ReporteContableSerializer

class CuentaContableViewSet(viewsets.ModelViewSet):
    queryset = CuentaContable.objects.all()
    permission_classes = [permissions.AllowAny] #LOS PERMISOS DE QUIEN VA A PODER CONSULTAR DATOS DE MI SERVIDOR. A futuro, se puede usar "isAuthenticated" para autenticar que usuario está consultando los datos
    serializer_class = CuentaContableSerializer

class AsientoContableViewSet(viewsets.ModelViewSet):
    queryset = AsientoContable.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = AsientoContableSerializer

class DetalleAsientoViewSet(viewsets.ModelViewSet):
    queryset = DetalleAsiento.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = DetalleAsientoSerializer

class TransaccionViewSet(viewsets.ModelViewSet):
    queryset = Transaccion.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = TransaccionSerializer

class ReporteContableViewSet(viewsets.ModelViewSet):
    queryset = ReporteContable.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = ReporteContableSerializer
