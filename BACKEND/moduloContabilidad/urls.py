from django.urls import path
from moduloContabilidad.views import hello

urlpatterns = [
    path('hello/', hello),
]