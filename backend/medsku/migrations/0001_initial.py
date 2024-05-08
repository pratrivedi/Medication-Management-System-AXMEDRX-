# Generated by Django 5.0.4 on 2024-05-08 09:20

from django.db import migrations, models


def create_countries(apps, schema_editor):
    Country = apps.get_model('medsku', 'Country')
    Country(name='Argentina').save()
    Country(name='Brazil').save()
    Country(name='Canada').save()
    Country(name='Colombia').save()
    Country(name='India').save()
    Country(name='Peru').save()
    Country(name='USA').save()

def create_medications(apps, schema_editor):
    Medication = apps.get_model('medsku', 'Medication')
    Country = apps.get_model('medsku', 'Country')
    argentina = Country.objects.get(name='Argentina')
    brazil = Country.objects.get(name='Brazil')
    canada = Country.objects.get(name='Canada')
    colombia = Country.objects.get(name='Colombia')

    medication1 = Medication(name='Paracetamol', dose=500, presentation='Tablet', unit=20)
    medication1.save()
    medication1.countries.add(argentina)

    medication2 = Medication(name='Ibuprofen', dose=400, presentation='Tablet', unit=20)
    medication2.save()
    medication2.countries.add(brazil, canada)

    medication3 = Medication(name='Omeprazole', dose=20, presentation='Capsule', unit=20)
    medication3.save()
    medication3.countries.add(colombia)


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Country',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Medication',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('dose', models.IntegerField(help_text='Enter the dose in milligrams (Mg)')),
                ('presentation', models.CharField(max_length=255)),
                ('unit', models.IntegerField()),
                ('countries', models.ManyToManyField(to='medsku.country')),
            ],
        ),
        migrations.RunPython(create_countries),
        migrations.RunPython(create_medications),
    ]
