##### using classes and ViewSets
# from __future__ import absolute_import
from rest_framework import viewsets
from .models import Category, Question, Quiz
from .serializers import CategorySerializer,  QuestionSerializer,  QuizSerializer
# from rest_framework.pagination import PageNumberPagination
# # from django_filters.rest_framework import DjangoFilterBackend
# from django_filters import rest_framework as filters

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
