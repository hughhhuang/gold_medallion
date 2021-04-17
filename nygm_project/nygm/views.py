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
            #if request.data['firstname'].lower()!= "null":
                #firstname = '"' + request.data['firstname'] + '"'
            #else:
                #firstname = request.data['firstname']
            firstname = request.data['firstname']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call update_userTable( "%s", %s, "%s", %s, "%s", "%s", %s, %s, %s)' % (request.data['username'], firstname, request.data['lastname'], request.data['age'], request.data['prefride'], request.data['vaccine'], request.data['zoneid'], request.data['zipcode'], request.data['favzoneid']))
                return Response(serializer.data)
            else:
                cursor = connection.cursor()
                cursor.execute('call update_userTable( "%s", "%s", "%s", %s, "%s", "%s", %s, %s, %s)' % (request.data['username'], request.data['firstname'], request.data['lastname'], request.data['age'], request.data['prefride'], request.data['vaccine'], request.data['zoneid'], request.data['zipcode'], request.data['favzoneid']))
                return Response(serializer.data)

        #if request.method == 'POST':
            #data = {
                #'username': request.data['username'],
                #'firstname': request.data['firstname'],
                #'lastname': request.data['lastname'],
                #'age': request.data['age'],
                #'prefride': request.data['prefride'],
                #'vaccine': request.data['vaccine'],
                #'zoneid': request.data['zoneid'],
                #'zipcode': request.data['zipcode'],
                #'favzoneid': request.data['favzoneid']
            #}

