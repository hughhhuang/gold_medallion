from django.urls import path
from . import views

urlpatterns = [
    path('api/nygm/', views.ZonedataListCreate.as_view() ),
    path('api/usertable/', views.UsertableListCreate.as_view() ),
    path('api/nycBoroughs/', views.NycboroughsListCreate.as_view() ),
    path('api/editusertable/', views.editUserTable.as_view() ),
    path('api/planRide/', views.planRide.as_view() ),
]