from django.urls import path
from moduloContabilidad.views import hello

from rest_framework import routers
from .api import CuentaContableViewSet, AsientoContableViewSet, DetalleAsientoViewSet, TransaccionViewSet

router = routers.DefaultRouter()

router.register('api/cuentascontables', CuentaContableViewSet, 'Cuentas Contables')
router.register('api/asientoscontables', AsientoContableViewSet, 'Asientos Contables')
router.register('api/detallesasientos', DetalleAsientoViewSet, 'Detalle de Asientos Contables')
router.register('api/transacciones', TransaccionViewSet, 'Transacciones')

urlpatterns = router.urls

'''
urlpatterns = [
    path('hello/', hello),
]
'''