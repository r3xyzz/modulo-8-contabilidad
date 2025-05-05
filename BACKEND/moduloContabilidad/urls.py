from django.urls import path
from moduloContabilidad.views import hello

from rest_framework import routers
from .api import CuentaContableViewSet, AsientoContableViewSet, DetalleAsientoViewSet, TransaccionViewSet

router = routers.DefaultRouter()

router.register('api/cuentasContables', CuentaContableViewSet, 'Cuentas Contables')
router.register('api/asientosContables', AsientoContableViewSet, 'Asientos Contables')
router.register('api/detallesAsientos', DetalleAsientoViewSet, 'Detalle de Asientos Contables')
router.register('api/transacciones', TransaccionViewSet, 'Transacciones')

urlpatterns = router.urls

'''
urlpatterns = [
    path('hello/', hello),
]
'''