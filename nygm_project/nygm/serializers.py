from rest_framework import serializers
from .models import Zonedata, Usertable, Nycboroughs, Coviddatabyday, covidDatabyDayManhattan, covidDatabyDayQueens, covidDatabyDayBronx, covidDatabyDayBrooklyn, covidDatabyDayStatenIsland, vaccineManhattan, vaccineQueens, vaccineBronx, vaccineBrooklyn, vaccineStatenIsland, zoneManhattan, zoneQueens, zoneBronx, zoneBrooklyn, zoneStatenIsland

class ZonedataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Zonedata
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')

class UsertableSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usertable
        fields = ('username', 'firstname', 'lastname', 'age', 'prefride', 'vaccine', 'zoneid', 'zipcode', 'favzoneid', 'favborough', 'minspend', 'maxspend', 'vaccpref', 'minridedistance', 'maxridedistance', 'maxridetime')

class NycboroughsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nycboroughs
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate', 'borough_name')

class covidDatabyDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = Coviddatabyday
        fields = ('date_of_interest', 'case_count', 'probable_case_count', 'hospitalized_count', 'death_count', 'probable_death_count', 'case_count_7day_avg', 'all_case_count_7day_avg', 'hosp_count_7day_avg',
                  'death_count_7day_avg', 'all_death_count_7day_avg', 'bx_case_count', 'bx_probable_case_count', 'bx_hospitalized_count', 'bx_death_count', 'bx_probable_death_count' , 'bx_case_count_7day_avg',
                  'bx_all_case_count_7day_avg', 'bx_hospitalized_count_7day_avg', 'bx_death_count_7day_avg', 'bx_all_death_count_7day_avg', 'bk_case_count', 'bk_probable_case_count', 'bk_hospitalized_count',
                  'bk_death_count', 'bk_probable_death_count', 'bk_case_count_7day_avg', 'bk_all_case_count_7day_avg', 'bk_hospitalized_count_7day_avg', 'bk_death_count_7day_avg', 'bk_all_death_count_7day_avg',
                  'mn_case_count', 'mn_probable_case_count', 'mn_hospitalized_count', 'mn_death_count', 'mn_probable_death_count', 'mn_case_count_7day_avg', 'mn_all_case_count_7day_avg', 'mn_hospitalized_count_7day_avg',
                  'mn_death_count_7day_avg', 'mn_all_death_count_7day_avg', 'qn_case_count', 'qn_probable_case_count', 'qn_hospitalized_count', 'qn_death_count', 'qn_probable_death_count', 'qn_case_count_7day_avg',
                  'qn_all_case_count_7day_avg', 'qn_hospitalized_count_7day_avg', 'qn_death_count_7day_avg', 'qn_all_death_count_7day_avg', 'si_case_count', 'si_probable_case_count', 'si_hospitalized_count',
                  'si_death_count', 'si_probable_death_count', 'si_case_count_7day_avg', 'si_all_case_count_7day_avg', 'si_hospitalized_count_7day_avg', 'si_death_count_7day_avg', 'si_all_death_count_7day_avg', 'incomplete')

class covidDatabyDayManhattanSerializer(serializers.ModelSerializer):
    class Meta:
        model = covidDatabyDayManhattan
        fields = ('date_of_interest', 'case_count', 'probable_case_count', 'hospitalized_count', 'death_count', 'probable_death_count', 'case_count_7day_avg', 'all_case_count_7day_avg', 'hospitalized_count_7day_avg',
                  'death_count_7day_avg', 'all_death_count_7day_avg')

class covidDatabyDayQueensSerializer(serializers.ModelSerializer):
    class Meta:
        model = covidDatabyDayQueens
        fields = ('date_of_interest', 'case_count', 'probable_case_count', 'hospitalized_count', 'death_count', 'probable_death_count', 'case_count_7day_avg', 'all_case_count_7day_avg', 'hospitalized_count_7day_avg',
                  'death_count_7day_avg', 'all_death_count_7day_avg')

class covidDatabyDayBronxSerializer(serializers.ModelSerializer):
    class Meta:
        model = covidDatabyDayBronx
        fields = ('date_of_interest', 'case_count', 'probable_case_count', 'hospitalized_count', 'death_count', 'probable_death_count', 'case_count_7day_avg', 'all_case_count_7day_avg', 'hospitalized_count_7day_avg',
                  'death_count_7day_avg', 'all_death_count_7day_avg')

class covidDatabyDayBrooklynSerializer(serializers.ModelSerializer):
    class Meta:
        model = covidDatabyDayBrooklyn
        fields = ('date_of_interest', 'case_count', 'probable_case_count', 'hospitalized_count', 'death_count', 'probable_death_count', 'case_count_7day_avg', 'all_case_count_7day_avg', 'hospitalized_count_7day_avg',
                  'death_count_7day_avg', 'all_death_count_7day_avg')

class covidDatabyDayStatenIslandSerializer(serializers.ModelSerializer):
    class Meta:
        model = covidDatabyDayStatenIsland
        fields = ('date_of_interest', 'case_count', 'probable_case_count', 'hospitalized_count', 'death_count', 'probable_death_count', 'case_count_7day_avg', 'all_case_count_7day_avg', 'hospitalized_count_7day_avg',
                  'death_count_7day_avg', 'all_death_count_7day_avg')

class vaccineManhattanSerializer(serializers.ModelSerializer):
    class Meta:
        model = vaccineManhattan
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate', 'borough_name')

class vaccineQueensSerializer(serializers.ModelSerializer):
    class Meta:
        model = vaccineQueens
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate', 'borough_name')

class vaccineBronxSerializer(serializers.ModelSerializer):
    class Meta:
        model = vaccineBronx
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate', 'borough_name')

class vaccineBrooklynSerializer(serializers.ModelSerializer):
    class Meta:
        model = vaccineBrooklyn
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate', 'borough_name')

class vaccineStatenIslandSerializer(serializers.ModelSerializer):
    class Meta:
        model = vaccineStatenIsland
        fields = ('neighborhood_name', 'zcta_num', 'at_least_1_dose', 'indicator', 'n_fully_vaccinated_cumulative', 'perc_fully', 'perc_at_least_1_dose', 'population_estimate', 'borough_name')

class zoneManhattanSerializer(serializers.ModelSerializer):
    class Meta:
        model = zoneManhattan
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')

class zoneQueensSerializer(serializers.ModelSerializer):
    class Meta:
        model = zoneQueens
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')

class zoneBronxSerializer(serializers.ModelSerializer):
    class Meta:
        model = zoneBronx
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')

class zoneBrooklynSerializer(serializers.ModelSerializer):
    class Meta:
        model = zoneBrooklyn
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')

class zoneStatenIslandSerializer(serializers.ModelSerializer):
    class Meta:
        model = zoneStatenIsland
        fields = ('zoneid', 'boroughname', 'zonename', 'servicezone')