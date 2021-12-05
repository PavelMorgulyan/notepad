from django.test import TestCase
from api.models import Note
import datetime
from api.serializers import NoteSerializer

class NoteSerializerTestCase(TestCase):
    def test_ok(self):
        note_1 = Note.objects.create(body="New Note for testing 1")
        note_2 = Note.objects.create(body="New Note for testing 2")
        data = NoteSerializer([note_1, note_2], many=True).data

        year = str(datetime.datetime.now().year)
        day = str(datetime.datetime.now().day)
        month = str(datetime.datetime.now().month)

        if datetime.datetime.now().day < 10:
            day = '0' + day

        if datetime.datetime.now().month < 10:
            month = '0' + month

        time_now = year + '-' + month + '-' + day

        expected_data = [
            {
                'id':note_1.id,
                'body': "New Note for testing 1",
                'updated':time_now,
                'created':time_now,
            }, 
            {
                'id':note_2.id,
                'body': "New Note for testing 2",
                'updated':time_now,
                'created':time_now,
            },
        ]

        self.assertEqual(expected_data, data)

