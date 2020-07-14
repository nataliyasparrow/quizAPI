# import django_filters
from django_filters import rest_framework as filters
from .models import Category, Question, Quiz

class QuizFilter(filters.FilterSet):
    class Meta:
        model = Quiz
        fields = ['category__title']