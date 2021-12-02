from django.http import response
from django.urls import reverse
from api.models import Note
from datetime import datetime
from api.serializers import NoteSerializer
from rest_framework.test import APITestCase


class ApiTestCase(APITestCase):
    def test_api(self):
        note_1 = Note.objects.create(body="Test note 1 test body", created=datetime.now())
        note_2 = Note.objects.create(body="Test note 2 test body", created=datetime.now())
        url=reverse('notes')
        response = self.client.get(url)
        serialize_data = NoteSerializer([note_1, note_2], many=True).data
        self.assertEqual(serialize_data, response.data)
        
        