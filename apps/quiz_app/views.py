from __future__ import absolute_import
from .models import Category, Question, Quiz
from .serializers import CategorySerializer,  QuestionSerializer,  QuizSerializer
# from rest_framework import viewsets

from django.http import Http404
from rest_framework.views import APIView
# from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from django_filters.rest_framework import DjangoFilterBackend

###### Category #######

class CategoryList(APIView):
    # List of all categories
    def get(self, request, format=None):
        categories = Category.objects.all()
        sr = CategorySerializer(categories, many=True)
        return Response(sr.data)

    # Create new category
    def post(self, request, format=None):
        sr = CategorySerializer(data=request.data)
        if sr.is_valid():
            sr.save()
            return Response(sr.data, status=status.HTTP_201_CREATED)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetail(APIView):
    def get_object(self, pk):
        try:
            return Category.objects.get(pk=pk)
        except Category.DoesNotExist:
            raise Http404
    
    # Retrieve category instance by id
    def get(self, request, pk, format=None):
        category = self.get_object(pk)
        sr = CategorySerializer(category)
        return Response(sr.data)

    # Update category instance
    def put(self, request, pk, format=None):
        category = self.get_object(pk)
        sr = CategorySerializer(category, data=request.data)
        if sr.is_valid():
            sr.save()
            return Response(sr.data)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # Delete category instance
    def delete(self, request, pk, format=None):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

####### Quiestion #######

class QuestionList(APIView):
    # List of all questions
    def get(self, request, format=None):
        quiestions = Question.objects.all()
        sr = QuestionSerializer(quiestions, many=True)
        return Response(sr.data)

    # Create new question
    def post(self, request, format=None):
        sr = QuestionSerializer(data=request.data)
        if sr.is_valid():
            sr.save()
            return Response(sr.data, status=status.HTTP_201_CREATED)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

class QuestionDetail(APIView):
    def get_object(self, pk):
        try:
            return Question.objects.get(pk=pk)
        except Question.DoesNotExist:
            raise Http404
    
    # Retrieve question instance by id
    def get(self, request, pk, format=None):
        question = self.get_object(pk)
        sr = QuestionSerializer(question)
        return Response(sr.data)

    # Update question instance
    def put(self, request, pk, format=None):
        question = self.get_object(pk)
        sr = QuestionSerializer(question, data=request.data)
        if sr.is_valid():
            sr.save()
            return Response(sr.data)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # Delete quiestion instance
    def delete(self, request, pk, format=None):
        question = self.get_object(pk)
        question.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


####### Quiz #######

class QuizList(APIView):
    # List of all quizes
    pagination_class = PageNumberPagination

    def get(self, request, format=None):
        quizes = Quiz.objects.all().order_by("title")
        sr = QuizSerializer(quizes, many=True)

        # filter_backends = [DjangoFilterBackend]
        # filterset_fields = ['category']

        # paginator = ResultsSetPagination()
        result_page = self.paginate_queryset(quizes)

        # sr = QuizSerializer(quizes, many=True)
        sr = QuizSerializer(result_page, many=True)

        # pagination_class = ResultsSetPagination()
        return self.get_paginated_response(sr.data)
        # return Response(sr.data)
    
    @property
    def paginator(self):
        """
        The paginator instance associated with the view, or `None`.
        """
        if not hasattr(self, '_paginator'):
            if self.pagination_class is None:
                self._paginator = None
            else:
                self._paginator = self.pagination_class()
        return self._paginator

    def paginate_queryset(self, queryset):
        """
        Return a single page of results, or `None` if pagination is disabled.
        """
        if self.paginator is None:
            return None
        return self.paginator.paginate_queryset(queryset, self.request, view=self)

    def get_paginated_response(self, data):
        """
        Return a paginated style `Response` object for the given output data.
        """
        assert self.paginator is not None
        return self.paginator.get_paginated_response(data)

    # Create new quiz
    def post(self, request, format=None):
        sr = QuizSerializer(data=request.data)
        if sr.is_valid():
            sr.save()
            return Response(sr.data, status=status.HTTP_201_CREATED)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

class QuizDetail(APIView):
    def get_object(self, pk):
        try:
            return Quiz.objects.get(pk=pk)
        except Quiz.DoesNotExist:
            raise Http404
    
    # Retrieve quiz instance by id
    def get(self, request, pk, format=None):
        quiz = self.get_object(pk)
        sr = QuizSerializer(quiz)
        return Response(sr.data)

    # Update quiz instance
    def put(self, request, pk, format=None):
        quiz = self.get_object(pk)
        sr = QuizSerializer(category, data=request.data)
        if sr.is_valid():
            sr.save()
            return Response(sr.data)
        return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # Delete quiz instance
    def delete(self, request, pk, format=None):
        quiz = self.get_object(pk)
        quiz.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)