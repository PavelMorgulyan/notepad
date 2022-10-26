from django.urls import path
from django.urls.resolvers import URLPattern

from . import views


urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('notes/', views.getsNotes, name="notes"),
    path('notes/<str:pk>/', views.getsNote, name="note"),
 ]
