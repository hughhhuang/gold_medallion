from django.shortcuts import render
from django.db import connection
from rest_framework.response import Response
from .models import Zonedata, Usertable, Nycboroughs, Coviddatabyday, covidDatabyDayManhattan, covidDatabyDayQueens, covidDatabyDayBronx, covidDatabyDayBrooklyn, covidDatabyDayStatenIsland, vaccineManhattan, vaccineQueens, vaccineBronx, vaccineBrooklyn, vaccineStatenIsland, zoneManhattan, zoneQueens, zoneBronx, zoneBrooklyn, zoneStatenIsland
from .serializers import ZonedataSerializer, UsertableSerializer, NycboroughsSerializer, covidDatabyDaySerializer, covidDatabyDayManhattanSerializer, covidDatabyDayQueensSerializer, covidDatabyDayBronxSerializer, covidDatabyDayBrooklynSerializer, covidDatabyDayStatenIslandSerializer, vaccineManhattanSerializer, vaccineQueensSerializer, vaccineBronxSerializer, vaccineBrooklynSerializer, vaccineStatenIslandSerializer, zoneManhattanSerializer, zoneQueensSerializer, zoneBronxSerializer, zoneBrooklynSerializer, zoneStatenIslandSerializer
from rest_framework import generics

def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

class ZonedataListCreate(generics.ListCreateAPIView):
    queryset = Zonedata.objects.all()
    serializer_class = ZonedataSerializer

class UsertableListCreate(generics.ListCreateAPIView):
    queryset = Usertable.objects.all()
    serializer_class = UsertableSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            username = request.data['username']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('SELECT * from userTable WHERE username = "%s"' % username)
                queryData = dictfetchall(cursor)
                return Response(queryData)
            else:
                cursor = connection.cursor()
                cursor.execute('SELECT * from userTable WHERE username = "%s"' % username)
                queryData = dictfetchall(cursor)
                return Response(queryData)

class NycboroughsListCreate(generics.ListCreateAPIView):
    queryset = Nycboroughs.objects.all()
    serializer_class = NycboroughsSerializer

class covidDatabyDayListCreate(generics.ListCreateAPIView):
    queryset = Coviddatabyday.objects.all()
    serializer_class = covidDatabyDaySerializer

class covidDatabyDayManhattanListCreate(generics.ListCreateAPIView):
    queryset = covidDatabyDayManhattan.objects.all()
    serializer_class = covidDatabyDayManhattanSerializer

class covidDatabyDayQueensListCreate(generics.ListCreateAPIView):
    queryset = covidDatabyDayQueens.objects.all()
    serializer_class = covidDatabyDayQueensSerializer

class covidDatabyDayBronxListCreate(generics.ListCreateAPIView):
    queryset = covidDatabyDayBronx.objects.all()
    serializer_class = covidDatabyDayBronxSerializer

class covidDatabyDayBrooklynListCreate(generics.ListCreateAPIView):
    queryset = covidDatabyDayBrooklyn.objects.all()
    serializer_class = covidDatabyDayBrooklynSerializer

class covidDatabyDayStatenIslandListCreate(generics.ListCreateAPIView):
    queryset = covidDatabyDayStatenIsland.objects.all()
    serializer_class = covidDatabyDayStatenIslandSerializer

class vaccineManhattanListCreate(generics.ListCreateAPIView):
    queryset = vaccineManhattan.objects.all()
    serializer_class = vaccineManhattanSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            percFully = request.data['perc_fully']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineManhattan WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)
            else:
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineManhattan WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)

class vaccineQueensListCreate(generics.ListCreateAPIView):
    queryset = vaccineQueens.objects.all()
    serializer_class = vaccineQueensSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            percFully = request.data['perc_fully']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineQueens WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)
            else:
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineQueens WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)

class vaccineBronxListCreate(generics.ListCreateAPIView):
    queryset = vaccineBronx.objects.all()
    serializer_class = vaccineBronxSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            percFully = request.data['perc_fully']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineBronx WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)
            else:
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineBronx WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)

class vaccineBrooklynListCreate(generics.ListCreateAPIView):
    queryset = vaccineBrooklyn.objects.all()
    serializer_class = vaccineBrooklynSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            percFully = request.data['perc_fully']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineBrooklyn WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)
            else:
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineBrooklyn WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)

class vaccineStatenIslandListCreate(generics.ListCreateAPIView):
    queryset = vaccineStatenIsland.objects.all()
    serializer_class = vaccineStatenIslandSerializer

    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            percFully = request.data['perc_fully']
            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineStatenIsland WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)
            else:
                cursor = connection.cursor()
                cursor.execute('SELECT * from vaccineStatenIsland WHERE PERC_FULLY >= %d' % percFully)
                queryData = dictfetchall(cursor)
                return Response(queryData)

class zoneManhattanList(generics.ListAPIView):
    queryset = zoneManhattan.objects.all()
    serializer_class = zoneManhattanSerializer

class zoneQueensList(generics.ListAPIView):
    queryset = zoneQueens.objects.all()
    serializer_class = zoneQueensSerializer

class zoneBronxList(generics.ListAPIView):
    queryset = zoneBronx.objects.all()
    serializer_class = zoneBronxSerializer

class zoneBrooklynList(generics.ListAPIView):
    queryset = zoneBrooklyn.objects.all()
    serializer_class = zoneBrooklynSerializer

class zoneStatenIslandList(generics.ListAPIView):
    queryset = zoneStatenIsland.objects.all()
    serializer_class = zoneStatenIslandSerializer

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
            if request.data['favborough'].lower()!= "null":
                favborough = '"' + request.data['favborough'] + '"'
            else:
                favborough = request.data['favborough']

            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call update_userTable( "%s", %s, %s, %s, %s, %s, %s, %s, %s, %s)' % (request.data['username'], firstname, lastname, request.data['age'], prefride, vaccine, request.data['zoneid'], request.data['zipcode'], request.data['favzoneid'], favborough))
                return Response(serializer.data)
            else:
                cursor = connection.cursor()
                cursor.execute('call update_userTable( "%s", %s, %s, %s, %s, %s, %s, %s, %s, %s)' % (request.data['username'], firstname, lastname, request.data['age'], prefride, vaccine, request.data['zoneid'], request.data['zipcode'], request.data['favzoneid'], favborough))
                return Response(serializer.data)


class planRide(generics.CreateAPIView):
    serializer_class = UsertableSerializer
    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)

            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call planRide("%s", %s, %s, %s, %s, %s, %s);' % (request.data['username'], request.data['minspend'], request.data['maxspend'], request.data['vaccpref'], request.data['minridedistance'], request.data['maxridedistance'], request.data['maxridetime']))
                return Response(serializer.data)
            else:
                cursor = connection.cursor()
                cursor.execute('call planRide("%s", %s, %s, %s, %s, %s, %s);' % (
                request.data['username'], request.data['minspend'], request.data['maxspend'], request.data['vaccpref'],
                request.data['minridedistance'], request.data['maxridedistance'], request.data['maxridetime']))
                return Response(serializer.data)

class getUserNeighborhoodsCreate(generics.CreateAPIView):
    queryset = Usertable.objects.all()
    serializer_class = UsertableSerializer
    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            username = request.data['username']

            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call getUserNeighborhoods("%s");' % username)
                queryData = dictfetchall(cursor)
                return Response(queryData)

            else:
                cursor = connection.cursor()
                cursor.execute('call getUserNeighborhoods("%s");' % username)
                queryData = dictfetchall(cursor)
                return Response(queryData)



class getUserZoneIDsCreate(generics.CreateAPIView):
    queryset = Usertable.objects.all()
    serializer_class = UsertableSerializer
    def post(self, request):
        if request.method == 'POST':
            serializer = self.get_serializer(data=request.data)
            username = request.data['username']

            if serializer.is_valid():
                cursor = connection.cursor()
                cursor.execute('call getUserZoneIDs("%s");' % username)
                queryData = dictfetchall(cursor)
                return Response(queryData)

            else:
                cursor = connection.cursor()
                cursor.execute('call getUserZoneIDs("%s");' % username)
                queryData = dictfetchall(cursor)
                return Response(queryData)