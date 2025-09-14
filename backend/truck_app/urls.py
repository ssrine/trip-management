from django.urls import path
from .views import trip_pdf

urlpatterns = [
    path('trips/<int:trip_id>/pdf/', trip_pdf, name='trip-pdf'),
]