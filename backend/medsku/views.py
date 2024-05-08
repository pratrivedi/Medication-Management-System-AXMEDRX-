from django.http import JsonResponse
from rest_framework import generics, status
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import viewsets
from .models import Country, Medication
from .serializers import CountrySerializer, MedicationSerializer

class MedicationListCreateAPIView(viewsets.ModelViewSet):
    queryset = Medication.objects.all()
    serializer_class = MedicationSerializer

    def list(self, request, *args, **kwargs):
        medications = self.get_queryset()
        countries = Country.objects.all()
        country_serializer = CountrySerializer(countries, many=True)
        medication_serializer = self.get_serializer(medications, many=True)
        return Response({'medications': medication_serializer.data, 'countries': country_serializer.data})
