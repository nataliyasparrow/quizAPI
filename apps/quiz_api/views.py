from rest_framework import viewsets
from .models import Category, Question, Quiz
from .serializers import CategorySerializer,  QuestionSerializer,  QuizSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination

class CategoryPagination(LimitOffsetPagination):
    default_limit = 50
    max_limit = 100

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('title', 'description')
    pagination_class = CategoryPagination

class QuestionPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', )
    search_fields = ()
    pagination_class = QuestionPagination

class QuizPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'category')
    search_fields = ('title')
    pagination_class = QuizPagination
