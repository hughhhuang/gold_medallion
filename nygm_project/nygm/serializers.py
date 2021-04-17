from rest_framework import serializers
from .models import Zonedata, Usertable, Nycboroughs

class ZonedataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zonedata
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')

class UsertableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usertable
        fields = ('username', 'firstname', 'lastname', 'age', 'prefride', 'vaccine', 'zoneid', 'zipcode', 'favzoneid', 'minspend', 'maxspend', 'vaccpref')

class NycboroughsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nycboroughs
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate')
