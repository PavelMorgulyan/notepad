from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.serializers import Serializer
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from rest_framework.permissions import AllowAny
from .utils import *
# Create your views here.

from .models import Note
from .serializers import NoteSerializer

@api_view(['GET']) # Какие методы получает от api
def getRoutes(request):

	routes = [
		{
			'Endpoint': '/notes/',
			'method': 'GET',
			'body': None,
			'description': 'Returns an array of notes'
		},
		{
			'Endpoint': '/notes/id',
			'method': 'GET',
			'body': None,
			'description': 'Returns a single note object'
		},
			{
			'Endpoint': '/notes/create/',
			'method': 'POST',
			'body': {'body': ""},
			'description': 'Creates new note with data sent in post request'
		},
		{
			'Endpoint': '/notes/id/update/',
			'method': 'PUT',
			'body': {'body': ""},
			'description': 'Creates an existing note with data sent in post request'
		},
		{
			'Endpoint': '/notes/id/delete/',
			'method': 'DELETE',
			'body': None,
			'description': 'Deletes and exiting note'
		},
	]

	return Response(routes)



@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
@csrf_exempt
def getsNotes(request):
	if request.method =='GET':
		return getNoteList(request)
	if request.method =='POST':
		return createNote(request)


@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([AllowAny])
@csrf_exempt
def getsNote(request, pk):
	if request.method =='GET':
		return getNoteDetail(request, pk)
	if request.method =='PUT':
		return updateNote(request, pk)
	if request.method =='DELETE':
		return deleteNote(request, pk)





