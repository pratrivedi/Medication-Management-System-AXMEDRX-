from django.db import models

# Create your models here.

from django.db import models

class Medication(models.Model):
    name = models.CharField(max_length=255)
    dose = models.IntegerField(help_text="Enter the dose in milligrams (Mg)")
    presentation = models.CharField(max_length=255)
    unit = models.IntegerField()
    countries = models.ManyToManyField('Country')

class Country(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name