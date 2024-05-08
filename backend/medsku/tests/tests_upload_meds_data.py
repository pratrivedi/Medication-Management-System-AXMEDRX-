# test_views.py
import django
import pytest
import os
from django.urls import reverse
from rest_framework.test import APIClient
from medsku.models import Medication, Country


@pytest.fixture
def api_client():
    return APIClient()

@pytest.mark.django_db
def test_upload_medicine_data(api_client):
    data = {
        'file': open('meds.csv', 'rb')
    }
    response = api_client.post(reverse('file-upload'), data, format='multipart')

    assert response.status_code == 200
    assert Medication.objects.count() > 0
    assert Country.objects.count() > 0