import re

from django.db import transaction
from django.http import JsonResponse
from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
import pandas as pd
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

class UploadMedicineData(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request):
        try:
            file = request.data['file']
            data = pd.read_csv(file)

            with transaction.atomic():
                for index, row in data.iterrows():
                    row = row.rename(lambda x: x.lower())
                    countries = [country.strip().capitalize() for country in row['countries'].split(',')]
                    country_objects = []

                    for country in countries:
                        country_object, created = Country.objects.get_or_create(
                            name__iexact=country,
                            defaults={'name': country}
                        )
                        country_objects.append(country_object)

                    dose_match = re.match(r'\d+', row['dose'])
                    dose = int(dose_match.group()) if dose_match else None
                    medication, created = Medication.objects.get_or_create(
                        name=row['name'].capitalize(),
                        dose=dose,
                        presentation=row['presentation'].capitalize(),
                        defaults={'unit': row['unit']}
                    )
                    if created is False:
                        medication.unit = row['unit'] +  medication.unit
                        medication.save()

                    medication.countries.add(*country_objects)

            return JsonResponse({'message': 'Medications uploaded successfully'}, status=200)
        except FileNotFoundError:
            return JsonResponse({'error': 'File not found'}, status=400)
        except pd.errors.EmptyDataError:
            return JsonResponse({'error': 'File is empty'}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
