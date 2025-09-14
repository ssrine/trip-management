from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from truck_app.views import TripViewSet, LogSheetViewSet, EntryViewSet, trip_pdf  

router = routers.DefaultRouter()
router.register(r'trips', TripViewSet)
router.register(r'logsheets', LogSheetViewSet)
router.register(r'entries', EntryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    
    path('api/trips/<int:trip_id>/pdf/', trip_pdf, name='trip-pdf'),
]
