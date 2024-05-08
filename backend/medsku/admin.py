from django.contrib import admin
from .models import Medication, Country

@admin.register(Medication)
class MedicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'dose_in_mg', 'presentation', 'unit')

    def dose_in_mg(self, obj):
        return f"{obj.dose} mg"
    dose_in_mg.short_description = 'Dose (mg)'

@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    list_display = ['name']

