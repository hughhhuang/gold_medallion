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
