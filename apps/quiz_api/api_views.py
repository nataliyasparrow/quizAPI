from rest_framework.exceptions import ValidationError
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveUpdateDestroyAPIView
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.pagination import LimitOffsetPagination

from apps.quiz_api.serializers import CategorySerializer
from apps.quiz_api.models import Category

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

class ProductRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
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

