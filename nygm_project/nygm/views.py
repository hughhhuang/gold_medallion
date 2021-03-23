from django.shortcuts import render
from .models import Zonedata, Usertable, Nycboroughs
from .serializers import ZonedataSerializer, UsertableSerializer, NycboroughsSerializer
from rest_framework import generics

class ZonedataListCreate(generics.ListCreateAPIView):
    queryset = Zonedata.objects.all()
    serializer_class = ZonedataSerializer

class UsertableListCreate(generics.ListCreateAPIView):
    queryset = Usertable.objects.all()
    serializer_class = UsertableSerializer

class NycboroughsListCreate(generics.ListCreateAPIView):
    queryset = Nycboroughs.objects.all()
    serializer_class = NycboroughsSerializer