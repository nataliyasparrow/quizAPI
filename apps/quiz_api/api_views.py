from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination

from apps.quiz_api.serializers import CategorySerializer, QuestionSerializer, QuizSerializer
from apps.quiz_api.models import Category, Question, Quiz

#Categories API
class CategoryPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class CategoryList(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ('title', 'description')
    pagination_class = CategoryPagination

class CategoryCreate(CreateAPIView):
    serializer_class = CategorySerializer

    def create(self, request, *args, **kwargs):
        try:
            title = request.data.get('title')
            if title is not None and title == "":
                raise ValidationError({ 'title': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'title': 'A valid string is required' })
        try:
            description = request.data.get('description')
            if description is not None and description == "":
                raise ValidationError({ 'description': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'description': 'A valid string is required' })
        return super().create(request, *args, **kwargs)

class CategoryRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    lookup_field = 'id'
    serializer_class = CategorySerializer

    def delete(self, request, *args, **kwargs):
        category_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('category_data_{}'.format(category_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        if response.status_code == 200:
            from django.core.cache import cache
            category = response.data
            cache.set('category_data_{}'.format(category['id']), {
                'title': category['title'],
                'description': category['description'],
            })
        return response

# Questions API

class QuestionPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class QuestionList(ListAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id',)
    search_fields = ()
    pagination_class = QuestionPagination

class QuestionCreate(CreateAPIView):
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        try:
            title = request.data.get('title')
            if title is not None and title == "":
                raise ValidationError({ 'title': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'title': 'A valid string is required' })
        try:
            description = request.data.get('description')
            if description is not None and description == "":
                raise ValidationError({ 'description': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'description': 'A valid string is required' })
        return super().create(request, *args, **kwargs)

class QuestionRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Question.objects.all()
    lookup_field = 'id'
    serializer_class = QuestionSerializer

    def delete(self, request, *args, **kwargs):
        category_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('question_data_{}'.format(question_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        # if response.status_code == 200:
        #     from django.core.cache import cache
        #     category = response.data
        #     cache.set('category_data_{}'.format(category['id']), {
        #         'title': category['title'],
        #         'description': category['description'],
        #     })
        return response

# Quizes API
class QuizPagination(LimitOffsetPagination):
    default_limit = 10
    max_limit = 100

class QuizList(ListAPIView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ('id', 'category')
    search_fields = ()
    pagination_class = QuizPagination

class QuizCreate(CreateAPIView):
    serializer_class = QuizSerializer

    def create(self, request, *args, **kwargs):
        try:
            title = request.data.get('title')
            # if title is not None and title == "":
            #     raise ValidationError({ 'title': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'title': 'A valid string is required' })
        try:
            category = request.data.get('category')
            # if category is not None:
            #     raise ValidationError({ 'category': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'category': 'A valid category id is required' })
        try:
            description = request.data.get('description')
            # if description is not None and description == "":
            #     raise ValidationError({ 'description': 'Must be not empty' })
        except ValueError:
            raise ValidationError({ 'description': 'A valid string is required' })
        return super().create(request, *args, **kwargs)

class QuizRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    queryset = Quiz.objects.all()
    lookup_field = 'id'
    serializer_class = QuizSerializer

    def delete(self, request, *args, **kwargs):
        quiz_id = request.data.get('id')
        response = super().delete(request, *args, **kwargs)
        if response.status_code == 204:
            from django.core.cache import cache
            cache.delete('quiz_data_{}'.format(question_id))
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        # if response.status_code == 200:
        #     from django.core.cache import cache
        #     category = response.data
        #     cache.set('category_data_{}'.format(category['id']), {
        #         'title': category['title'],
        #         'description': category['description'],
        #     })
        return response