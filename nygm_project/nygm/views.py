from django.shortcuts import render
from django.db import connection
from rest_framework.response import Response
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

class editUserTable(generics.CreateAPIView):
    #queryset = Usertable.objects.all()
    serializer_class = UsertableSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            if request.data['firstname'].lower()!= "null":
                firstname = '"' + request.data['firstname'] + '"'
            else:
                firstname = request.data['firstname']
            if request.data['lastname'].lower()!= "null":
                lastname = '"' + request.data['lastname'] + '"'
            else:
                lastname = request.data['lastname']
            if request.data['prefride'].lower()!= "null":
                prefride = '"' + request.data['prefride'] + '"'
            else:
                prefride = request.data['prefride']
            if request.data['vaccine'].lower()!= "null":
                vaccine = '"' + request.data['vaccine'] + '"'
            else:
                vaccine = request.data['vaccine']

            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call update_userTable( "%s", %s, %s, %s, %s, %s, %s, %s, %s)' % (request.data['username'], firstname, lastname, request.data['age'], prefride, vaccine, request.data['zoneid'], request.data['zipcode'], request.data['favzoneid']))
                return Response(serializer.data)
            else:
                cursor = connection.cursor()
                cursor.execute('call update_userTable( "%s", %s, %s, %s, %s, %s, %s, %s, %s)' % (request.data['username'], firstname, lastname, request.data['age'], prefride, vaccine, request.data['zoneid'], request.data['zipcode'], request.data['favzoneid']))
                return Response(serializer.data)


class planRide(generics.CreateAPIView):
    serializer_class = UsertableSerializer
    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call planRide("%s", %s, %s, %s);' % (request.data['username'], request.data['minspend'], request.data['maxspend'], request.data['vaccpref']))
                return Response(serializer.data)
            else:
                cursor = connection.cursor()
                cursor.execute('call planRide("%s", %s, %s, %s);' % (request.data['username'], request.data['minspend'], request.data['maxspend'], request.data['vaccpref']))
                return Response(serializer.data)
