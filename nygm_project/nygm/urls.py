from django.urls import path
from . import views

urlpatterns = [
    path('api/nygm/', views.ZonedataListCreate.as_view() ),
    path('api/usertable/', views.UsertableListCreate.as_view() ),
    path('api/nycBoroughs/', views.NycboroughsListCreate.as_view() ),
    path('api/editusertable/', views.editUserTable.as_view() ),
    path('api/planRide/', views.planRide.as_view() ),
    path('api/covidDatabyDay/', views.covidDatabyDayListCreate.as_view() ),
    path('api/covidDatabyDayManhattan/', views.covidDatabyDayManhattanListCreate.as_view() ),
    path('api/covidDatabyDayQueens/', views.covidDatabyDayQueensListCreate.as_view() ),
    path('api/covidDatabyDayBronx/', views.covidDatabyDayBronxListCreate.as_view() ),
    path('api/covidDatabyDayBrooklyn/', views.covidDatabyDayBrooklynListCreate.as_view() ),
    path('api/covidDatabyDayStatenIsland/', views.covidDatabyDayStatenIslandListCreate.as_view() ),
    path('api/vaccineManhattan/', views.vaccineManhattanListCreate.as_view() ),
    path('api/vaccineQueens/', views.vaccineQueensListCreate.as_view() ),
    path('api/vaccineBronx/', views.vaccineBronxListCreate.as_view() ),
    path('api/vaccineBrooklyn/', views.vaccineBrooklynListCreate.as_view() ),
    path('api/vaccineStatenIsland/', views.vaccineStatenIslandListCreate.as_view() ),
    path('api/zoneManhattan/', views.zoneManhattanList.as_view() ),
    path('api/zoneQueens/', views.zoneQueensList.as_view() ),
    path('api/zoneBronx/', views.zoneBronxList.as_view() ),
    path('api/zoneBrooklyn/', views.zoneBrooklynList.as_view() ),
    path('api/zoneStatenIsland/', views.zoneStatenIslandList.as_view() ),
    path('api/getUserZoneIDs/', views.getUserZoneIDsCreate.as_view() ),
    path('api/getUserNeighborhoods/', views.getUserNeighborhoodsCreate.as_view() ),
]