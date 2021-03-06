# Generated by Django 3.1.7 on 2021-03-23 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('nygm', '0003_auto_20210320_1453'),
    ]

    operations = [
        migrations.CreateModel(
            name='Nycboroughs',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ï_neighborhood_name', models.TextField(blank=True, db_column='ï»¿NEIGHBORHOOD_NAME', null=True)),
                ('zcta_num', models.IntegerField(blank=True, db_column='Zcta Num', null=True)),
                ('at_least_1_dose', models.TextField(blank=True, db_column='At least 1 dose', null=True)),
                ('indicator', models.TextField(blank=True, db_column='Indicator', null=True)),
                ('n_fully_vaccinated_cumulative', models.TextField(blank=True, db_column='N_FULLY_VACCINATED_CUMULATIVE', null=True)),
                ('perc_fully', models.TextField(blank=True, db_column='PERC_FULLY', null=True)),
                ('perc_at_least_1_dose', models.TextField(blank=True, db_column='PERC_at least 1 dose', null=True)),
                ('population_estimate', models.TextField(blank=True, db_column='POPULATION_ESTIMATE', null=True)),
            ],
            options={
                'db_table': 'nycBoroughs',
                'managed': False,
            },
        ),
        migrations.AlterModelTable(
            name='usertable',
            table='userTable',
        ),
    ]
