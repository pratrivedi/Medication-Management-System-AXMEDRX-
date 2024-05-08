from rest_framework import serializers
from .models import Medication, Country

class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = '__all__'

class MedicationSerializer(serializers.ModelSerializer):
    countries = serializers.PrimaryKeyRelatedField(many=True, queryset=Country.objects.all(),required=False)
    class Meta:
        model = Medication
        fields = '__all__'
