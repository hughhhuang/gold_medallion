# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user = models.OneToOneField(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'authtoken_token'

class Coviddatabyday(models.Model):
    date_of_interest = models.CharField(primary_key=True, max_length=45)
    case_count = models.IntegerField(db_column='CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_case_count = models.IntegerField(db_column='PROBABLE_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    hospitalized_count = models.IntegerField(db_column='HOSPITALIZED_COUNT', blank=True, null=True)  # Field name made lowercase.
    death_count = models.IntegerField(db_column='DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_death_count = models.IntegerField(db_column='PROBABLE_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    case_count_7day_avg = models.IntegerField(db_column='CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    all_case_count_7day_avg = models.IntegerField(db_column='ALL_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    hosp_count_7day_avg = models.IntegerField(db_column='HOSP_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    death_count_7day_avg = models.IntegerField(db_column='DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    all_death_count_7day_avg = models.IntegerField(db_column='ALL_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bx_case_count = models.IntegerField(db_column='BX_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    bx_probable_case_count = models.IntegerField(db_column='BX_PROBABLE_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    bx_hospitalized_count = models.IntegerField(db_column='BX_HOSPITALIZED_COUNT', blank=True, null=True)  # Field name made lowercase.
    bx_death_count = models.IntegerField(db_column='BX_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    bx_probable_death_count = models.IntegerField(db_column='BX_PROBABLE_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    bx_case_count_7day_avg = models.IntegerField(db_column='BX_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bx_all_case_count_7day_avg = models.IntegerField(db_column='BX_ALL_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bx_hospitalized_count_7day_avg = models.IntegerField(db_column='BX_HOSPITALIZED_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bx_death_count_7day_avg = models.IntegerField(db_column='BX_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bx_all_death_count_7day_avg = models.IntegerField(db_column='BX_ALL_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bk_case_count = models.IntegerField(db_column='BK_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    bk_probable_case_count = models.IntegerField(db_column='BK_PROBABLE_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    bk_hospitalized_count = models.IntegerField(db_column='BK_HOSPITALIZED_COUNT', blank=True, null=True)  # Field name made lowercase.
    bk_death_count = models.IntegerField(db_column='BK_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    bk_probable_death_count = models.IntegerField(db_column='BK_PROBABLE_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    bk_case_count_7day_avg = models.IntegerField(db_column='BK_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bk_all_case_count_7day_avg = models.IntegerField(db_column='BK_ALL_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bk_hospitalized_count_7day_avg = models.IntegerField(db_column='BK_HOSPITALIZED_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bk_death_count_7day_avg = models.IntegerField(db_column='BK_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    bk_all_death_count_7day_avg = models.IntegerField(db_column='BK_ALL_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    mn_case_count = models.IntegerField(db_column='MN_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    mn_probable_case_count = models.IntegerField(db_column='MN_PROBABLE_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    mn_hospitalized_count = models.IntegerField(db_column='MN_HOSPITALIZED_COUNT', blank=True, null=True)  # Field name made lowercase.
    mn_death_count = models.IntegerField(db_column='MN_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    mn_probable_death_count = models.IntegerField(db_column='MN_PROBABLE_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    mn_case_count_7day_avg = models.IntegerField(db_column='MN_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    mn_all_case_count_7day_avg = models.IntegerField(db_column='MN_ALL_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    mn_hospitalized_count_7day_avg = models.IntegerField(db_column='MN_HOSPITALIZED_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    mn_death_count_7day_avg = models.IntegerField(db_column='MN_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    mn_all_death_count_7day_avg = models.IntegerField(db_column='MN_ALL_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    qn_case_count = models.IntegerField(db_column='QN_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    qn_probable_case_count = models.IntegerField(db_column='QN_PROBABLE_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    qn_hospitalized_count = models.IntegerField(db_column='QN_HOSPITALIZED_COUNT', blank=True, null=True)  # Field name made lowercase.
    qn_death_count = models.IntegerField(db_column='QN_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    qn_probable_death_count = models.IntegerField(db_column='QN_PROBABLE_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    qn_case_count_7day_avg = models.IntegerField(db_column='QN_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    qn_all_case_count_7day_avg = models.IntegerField(db_column='QN_ALL_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    qn_hospitalized_count_7day_avg = models.IntegerField(db_column='QN_HOSPITALIZED_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    qn_death_count_7day_avg = models.IntegerField(db_column='QN_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    qn_all_death_count_7day_avg = models.IntegerField(db_column='QN_ALL_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    si_case_count = models.IntegerField(db_column='SI_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    si_probable_case_count = models.IntegerField(db_column='SI_PROBABLE_CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    si_hospitalized_count = models.IntegerField(db_column='SI_HOSPITALIZED_COUNT', blank=True, null=True)  # Field name made lowercase.
    si_death_count = models.IntegerField(db_column='SI_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    si_probable_death_count = models.IntegerField(db_column='SI_PROBABLE_DEATH_COUNT', blank=True, null=True)  # Field name made lowercase.
    si_case_count_7day_avg = models.IntegerField(db_column='SI_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    si_all_case_count_7day_avg = models.IntegerField(db_column='SI_ALL_CASE_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    si_hospitalized_count_7day_avg = models.IntegerField(db_column='SI_HOSPITALIZED_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    si_death_count_7day_avg = models.IntegerField(db_column='SI_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    si_all_death_count_7day_avg = models.IntegerField(db_column='SI_ALL_DEATH_COUNT_7DAY_AVG', blank=True, null=True)  # Field name made lowercase.
    incomplete = models.IntegerField(db_column='INCOMPLETE', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'covidDatabyDay'

class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Nycboroughs(models.Model):
    neighborhood_name = models.TextField(db_column='NEIGHBORHOOD_NAME', blank=True, null=True)  # Field name made lowercase.
    zcta_num = models.IntegerField(db_column='Zcta Num', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    at_least_1_dose = models.TextField(db_column='At least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    indicator = models.TextField(db_column='Indicator', blank=True, null=True)  # Field name made lowercase.
    n_fully_vaccinated_cumulative = models.TextField(db_column='N_FULLY_VACCINATED_CUMULATIVE', blank=True, null=True)  # Field name made lowercase.
    perc_fully = models.TextField(db_column='PERC_FULLY', blank=True, null=True)  # Field name made lowercase.
    perc_at_least_1_dose = models.TextField(db_column='PERC_at least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    population_estimate = models.TextField(db_column='POPULATION_ESTIMATE', blank=True, null=True)  # Field name made lowercase.
    borough_name = models.TextField(db_column='BOROUGH_NAME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'nycBoroughs'


class Usertable(models.Model):
    username = models.CharField(primary_key=True, max_length=45)
    firstname = models.CharField(db_column='firstName', max_length=45, blank=True, null=True)  # Field name made lowercase.
    lastname = models.CharField(db_column='lastName', max_length=45, blank=True, null=True)  # Field name made lowercase.
    age = models.IntegerField(db_column='Age', blank=True, null=True)  # Field name made lowercase.
    prefride = models.CharField(db_column='prefRide', max_length=45, blank=True, null=True)  # Field name made lowercase.
    vaccine = models.CharField(max_length=45, blank=True, null=True)
    zoneid = models.ForeignKey('Zonedata',  models.DO_NOTHING, related_name='userzoneid', db_column='zoneId', blank=True, null=True)  # Field name made lowercase.
    zipcode = models.ForeignKey(Nycboroughs, models.DO_NOTHING, db_column='zipcode', blank=True, null=True)
    favzoneid = models.ForeignKey('Zonedata', models.DO_NOTHING, related_name='favzoneid', db_column='favZoneId', blank=True, null=True)  # Field name made lowercase.
    favborough = models.CharField(db_column='favBorough', max_length=45, blank=True, null=True)  # Field name made lowercase.
    minspend = models.IntegerField(db_column='minSpend', blank=True, null=True)
    maxspend = models.IntegerField(db_column='maxSpend', blank=True, null=True)
    vaccpref = models.IntegerField(db_column='vaccPref', blank=True, null=True)
    minridedistance = models.IntegerField(db_column='minRideDistance', blank=True, null=True)
    maxridedistance = models.IntegerField(db_column='maxRideDistance', blank=True, null=True)
    maxridetime = models.IntegerField(db_column='maxRideTime', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'userTable'


class Zonedata(models.Model):
    zoneid = models.IntegerField(db_column='zoneID', primary_key=True)  # Field name made lowercase.
    boroughname = models.TextField(db_column='boroughName', blank=True, null=True)  # Field name made lowercase.
    zonename = models.TextField(db_column='zoneName', blank=True, null=True)  # Field name made lowercase.
    servicezone = models.TextField(db_column='serviceZone', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'zoneData'

#views
class vaccineManhattan(models.Model):
    neighborhood_name = models.TextField(db_column='NEIGHBORHOOD_NAME', blank=True, null=True)  # Field name made lowercase.
    zcta_num = models.IntegerField(db_column='Zcta Num', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    at_least_1_dose = models.TextField(db_column='At least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    indicator = models.TextField(db_column='Indicator', blank=True, null=True)  # Field name made lowercase.
    n_fully_vaccinated_cumulative = models.TextField(db_column='N_FULLY_VACCINATED_CUMULATIVE', blank=True, null=True)  # Field name made lowercase.
    perc_fully = models.TextField(db_column='PERC_FULLY', blank=True, null=True)  # Field name made lowercase.
    perc_at_least_1_dose = models.TextField(db_column='PERC_at least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    population_estimate = models.TextField(db_column='POPULATION_ESTIMATE', blank=True, null=True)  # Field name made lowercase.
    borough_name = models.TextField(db_column='BOROUGH_NAME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vaccineManhattan'

class vaccineQueens(models.Model):
    neighborhood_name = models.TextField(db_column='NEIGHBORHOOD_NAME', blank=True, null=True)  # Field name made lowercase.
    zcta_num = models.IntegerField(db_column='Zcta Num', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    at_least_1_dose = models.TextField(db_column='At least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    indicator = models.TextField(db_column='Indicator', blank=True, null=True)  # Field name made lowercase.
    n_fully_vaccinated_cumulative = models.TextField(db_column='N_FULLY_VACCINATED_CUMULATIVE', blank=True, null=True)  # Field name made lowercase.
    perc_fully = models.TextField(db_column='PERC_FULLY', blank=True, null=True)  # Field name made lowercase.
    perc_at_least_1_dose = models.TextField(db_column='PERC_at least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    population_estimate = models.TextField(db_column='POPULATION_ESTIMATE', blank=True, null=True)  # Field name made lowercase.
    borough_name = models.TextField(db_column='BOROUGH_NAME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vaccineQueens'

class vaccineBronx(models.Model):
    neighborhood_name = models.TextField(db_column='NEIGHBORHOOD_NAME', blank=True, null=True)  # Field name made lowercase.
    zcta_num = models.IntegerField(db_column='Zcta Num', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    at_least_1_dose = models.TextField(db_column='At least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    indicator = models.TextField(db_column='Indicator', blank=True, null=True)  # Field name made lowercase.
    n_fully_vaccinated_cumulative = models.TextField(db_column='N_FULLY_VACCINATED_CUMULATIVE', blank=True, null=True)  # Field name made lowercase.
    perc_fully = models.TextField(db_column='PERC_FULLY', blank=True, null=True)  # Field name made lowercase.
    perc_at_least_1_dose = models.TextField(db_column='PERC_at least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    population_estimate = models.TextField(db_column='POPULATION_ESTIMATE', blank=True, null=True)  # Field name made lowercase.
    borough_name = models.TextField(db_column='BOROUGH_NAME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vaccineBronx'

class vaccineBrooklyn(models.Model):
    neighborhood_name = models.TextField(db_column='NEIGHBORHOOD_NAME', blank=True, null=True)  # Field name made lowercase.
    zcta_num = models.IntegerField(db_column='Zcta Num', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    at_least_1_dose = models.TextField(db_column='At least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    indicator = models.TextField(db_column='Indicator', blank=True, null=True)  # Field name made lowercase.
    n_fully_vaccinated_cumulative = models.TextField(db_column='N_FULLY_VACCINATED_CUMULATIVE', blank=True, null=True)  # Field name made lowercase.
    perc_fully = models.TextField(db_column='PERC_FULLY', blank=True, null=True)  # Field name made lowercase.
    perc_at_least_1_dose = models.TextField(db_column='PERC_at least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    population_estimate = models.TextField(db_column='POPULATION_ESTIMATE', blank=True, null=True)  # Field name made lowercase.
    borough_name = models.TextField(db_column='BOROUGH_NAME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vaccineBrooklyn'

class vaccineStatenIsland(models.Model):
    neighborhood_name = models.TextField(db_column='NEIGHBORHOOD_NAME', blank=True, null=True)  # Field name made lowercase.
    zcta_num = models.IntegerField(db_column='Zcta Num', primary_key=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    at_least_1_dose = models.TextField(db_column='At least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    indicator = models.TextField(db_column='Indicator', blank=True, null=True)  # Field name made lowercase.
    n_fully_vaccinated_cumulative = models.TextField(db_column='N_FULLY_VACCINATED_CUMULATIVE', blank=True, null=True)  # Field name made lowercase.
    perc_fully = models.TextField(db_column='PERC_FULLY', blank=True, null=True)  # Field name made lowercase.
    perc_at_least_1_dose = models.TextField(db_column='PERC_at least 1 dose', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters.
    population_estimate = models.TextField(db_column='POPULATION_ESTIMATE', blank=True, null=True)  # Field name made lowercase.
    borough_name = models.TextField(db_column='BOROUGH_NAME', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'vaccineStatenIsland'

class zoneManhattan(models.Model):
    zoneid = models.IntegerField(db_column='zoneID', primary_key=True)  # Field name made lowercase.
    boroughname = models.TextField(db_column='boroughName', blank=True, null=True)  # Field name made lowercase.
    zonename = models.TextField(db_column='zoneName', blank=True, null=True)  # Field name made lowercase.
    servicezone = models.TextField(db_column='serviceZone', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'zoneManhattan'

class zoneQueens(models.Model):
    zoneid = models.IntegerField(db_column='zoneID', primary_key=True)  # Field name made lowercase.
    boroughname = models.TextField(db_column='boroughName', blank=True, null=True)  # Field name made lowercase.
    zonename = models.TextField(db_column='zoneName', blank=True, null=True)  # Field name made lowercase.
    servicezone = models.TextField(db_column='serviceZone', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'zoneQueens'

class zoneBronx(models.Model):
    zoneid = models.IntegerField(db_column='zoneID', primary_key=True)  # Field name made lowercase.
    boroughname = models.TextField(db_column='boroughName', blank=True, null=True)  # Field name made lowercase.
    zonename = models.TextField(db_column='zoneName', blank=True, null=True)  # Field name made lowercase.
    servicezone = models.TextField(db_column='serviceZone', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'zoneBronx'

class zoneBrooklyn(models.Model):
    zoneid = models.IntegerField(db_column='zoneID', primary_key=True)  # Field name made lowercase.
    boroughname = models.TextField(db_column='boroughName', blank=True, null=True)  # Field name made lowercase.
    zonename = models.TextField(db_column='zoneName', blank=True, null=True)  # Field name made lowercase.
    servicezone = models.TextField(db_column='serviceZone', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'zoneBrooklyn'

class zoneStatenIsland(models.Model):
    zoneid = models.IntegerField(db_column='zoneID', primary_key=True)  # Field name made lowercase.
    boroughname = models.TextField(db_column='boroughName', blank=True, null=True)  # Field name made lowercase.
    zonename = models.TextField(db_column='zoneName', blank=True, null=True)  # Field name made lowercase.
    servicezone = models.TextField(db_column='serviceZone', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'zoneStatenIsland'

class covidDatabyDayManhattan(models.Model):
    date_of_interest = models.CharField(primary_key=True, max_length=45)
    case_count = models.IntegerField(db_column='CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_case_count = models.IntegerField(db_column='PROBABLE_CASE_COUNT', blank=True,
                                                 null=True)  # Field name made lowercase.
    hospitalized_count = models.IntegerField(db_column='HOSPITALIZED_COUNT', blank=True,
                                                null=True)  # Field name made lowercase.
    death_count = models.IntegerField(db_column='DEATH_COUNT', blank=True,
                                         null=True)  # Field name made lowercase.
    probable_death_count = models.IntegerField(db_column='PROBABLE_DEATH_COUNT', blank=True,
                                                  null=True)  # Field name made lowercase.
    case_count_7day_avg = models.IntegerField(db_column='CASE_COUNT_7DAY_AVG', blank=True,
                                                 null=True)  # Field name made lowercase.
    all_case_count_7day_avg = models.IntegerField(db_column='ALL_CASE_COUNT_7DAY_AVG', blank=True,
                                                     null=True)  # Field name made lowercase.
    hospitalized_count_7day_avg = models.IntegerField(db_column='HOSPITALIZED_COUNT_7DAY_AVG', blank=True,
                                                         null=True)  # Field name made lowercase.
    death_count_7day_avg = models.IntegerField(db_column='DEATH_COUNT_7DAY_AVG', blank=True,
                                                  null=True)  # Field name made lowercase.
    all_death_count_7day_avg = models.IntegerField(db_column='ALL_DEATH_COUNT_7DAY_AVG', blank=True,
                                                      null=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'covidDatabyDayManhattan'


class covidDatabyDayQueens(models.Model):
    date_of_interest = models.CharField(primary_key=True, max_length=45)
    case_count = models.IntegerField(db_column='CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_case_count = models.IntegerField(db_column='PROBABLE_CASE_COUNT', blank=True,
                                              null=True)  # Field name made lowercase.
    hospitalized_count = models.IntegerField(db_column='HOSPITALIZED_COUNT', blank=True,
                                             null=True)  # Field name made lowercase.
    death_count = models.IntegerField(db_column='DEATH_COUNT', blank=True,
                                      null=True)  # Field name made lowercase.
    probable_death_count = models.IntegerField(db_column='PROBABLE_DEATH_COUNT', blank=True,
                                               null=True)  # Field name made lowercase.
    case_count_7day_avg = models.IntegerField(db_column='CASE_COUNT_7DAY_AVG', blank=True,
                                              null=True)  # Field name made lowercase.
    all_case_count_7day_avg = models.IntegerField(db_column='ALL_CASE_COUNT_7DAY_AVG', blank=True,
                                                  null=True)  # Field name made lowercase.
    hospitalized_count_7day_avg = models.IntegerField(db_column='HOSPITALIZED_COUNT_7DAY_AVG', blank=True,
                                                      null=True)  # Field name made lowercase.
    death_count_7day_avg = models.IntegerField(db_column='DEATH_COUNT_7DAY_AVG', blank=True,
                                               null=True)  # Field name made lowercase.
    all_death_count_7day_avg = models.IntegerField(db_column='ALL_DEATH_COUNT_7DAY_AVG', blank=True,
                                                   null=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'covidDatabyDayQueens'


class covidDatabyDayBronx(models.Model):
    date_of_interest = models.CharField(primary_key=True, max_length=45)
    case_count = models.IntegerField(db_column='CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_case_count = models.IntegerField(db_column='PROBABLE_CASE_COUNT', blank=True,
                                              null=True)  # Field name made lowercase.
    hospitalized_count = models.IntegerField(db_column='HOSPITALIZED_COUNT', blank=True,
                                             null=True)  # Field name made lowercase.
    death_count = models.IntegerField(db_column='DEATH_COUNT', blank=True,
                                      null=True)  # Field name made lowercase.
    probable_death_count = models.IntegerField(db_column='PROBABLE_DEATH_COUNT', blank=True,
                                               null=True)  # Field name made lowercase.
    case_count_7day_avg = models.IntegerField(db_column='CASE_COUNT_7DAY_AVG', blank=True,
                                              null=True)  # Field name made lowercase.
    all_case_count_7day_avg = models.IntegerField(db_column='ALL_CASE_COUNT_7DAY_AVG', blank=True,
                                                  null=True)  # Field name made lowercase.
    hospitalized_count_7day_avg = models.IntegerField(db_column='HOSPITALIZED_COUNT_7DAY_AVG', blank=True,
                                                      null=True)  # Field name made lowercase.
    death_count_7day_avg = models.IntegerField(db_column='DEATH_COUNT_7DAY_AVG', blank=True,
                                               null=True)  # Field name made lowercase.
    all_death_count_7day_avg = models.IntegerField(db_column='ALL_DEATH_COUNT_7DAY_AVG', blank=True,
                                                   null=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'covidDatabyDayBronx'


class covidDatabyDayBrooklyn(models.Model):
    date_of_interest = models.CharField(primary_key=True, max_length=45)
    case_count = models.IntegerField(db_column='CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_case_count = models.IntegerField(db_column='PROBABLE_CASE_COUNT', blank=True,
                                              null=True)  # Field name made lowercase.
    hospitalized_count = models.IntegerField(db_column='HOSPITALIZED_COUNT', blank=True,
                                             null=True)  # Field name made lowercase.
    death_count = models.IntegerField(db_column='DEATH_COUNT', blank=True,
                                      null=True)  # Field name made lowercase.
    probable_death_count = models.IntegerField(db_column='PROBABLE_DEATH_COUNT', blank=True,
                                               null=True)  # Field name made lowercase.
    case_count_7day_avg = models.IntegerField(db_column='CASE_COUNT_7DAY_AVG', blank=True,
                                              null=True)  # Field name made lowercase.
    all_case_count_7day_avg = models.IntegerField(db_column='ALL_CASE_COUNT_7DAY_AVG', blank=True,
                                                  null=True)  # Field name made lowercase.
    hospitalized_count_7day_avg = models.IntegerField(db_column='HOSPITALIZED_COUNT_7DAY_AVG', blank=True,
                                                      null=True)  # Field name made lowercase.
    death_count_7day_avg = models.IntegerField(db_column='DEATH_COUNT_7DAY_AVG', blank=True,
                                               null=True)  # Field name made lowercase.
    all_death_count_7day_avg = models.IntegerField(db_column='ALL_DEATH_COUNT_7DAY_AVG', blank=True,
                                                   null=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'covidDatabyDayBrooklyn'

class covidDatabyDayStatenIsland(models.Model):
    date_of_interest = models.CharField(primary_key=True, max_length=45)
    case_count = models.IntegerField(db_column='CASE_COUNT', blank=True, null=True)  # Field name made lowercase.
    probable_case_count = models.IntegerField(db_column='PROBABLE_CASE_COUNT', blank=True,
                                              null=True)  # Field name made lowercase.
    hospitalized_count = models.IntegerField(db_column='HOSPITALIZED_COUNT', blank=True,
                                             null=True)  # Field name made lowercase.
    death_count = models.IntegerField(db_column='DEATH_COUNT', blank=True,
                                      null=True)  # Field name made lowercase.
    probable_death_count = models.IntegerField(db_column='PROBABLE_DEATH_COUNT', blank=True,
                                               null=True)  # Field name made lowercase.
    case_count_7day_avg = models.IntegerField(db_column='CASE_COUNT_7DAY_AVG', blank=True,
                                              null=True)  # Field name made lowercase.
    all_case_count_7day_avg = models.IntegerField(db_column='ALL_CASE_COUNT_7DAY_AVG', blank=True,
                                                  null=True)  # Field name made lowercase.
    hospitalized_count_7day_avg = models.IntegerField(db_column='HOSPITALIZED_COUNT_7DAY_AVG', blank=True,
                                                      null=True)  # Field name made lowercase.
    death_count_7day_avg = models.IntegerField(db_column='DEATH_COUNT_7DAY_AVG', blank=True,
                                               null=True)  # Field name made lowercase.
    all_death_count_7day_avg = models.IntegerField(db_column='ALL_DEATH_COUNT_7DAY_AVG', blank=True,
                                                   null=True)  # Field name made lowercase.
    class Meta:
        managed = False
        db_table = 'covidDatabyDayStatenIsland'