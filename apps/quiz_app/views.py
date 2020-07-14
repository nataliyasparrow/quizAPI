from __future__ import absolute_import
from .models import Category, Question, Quiz
from .serializers import CategorySerializer,  QuestionSerializer,  QuizSerializer
# from rest_framework import viewsets

from django.http import Http404
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
# from rest_framework.pagination import PageNumberPagination
# from django_filters.rest_framework import DjangoFilterBackend
# from django_filters import rest_framework as filters
from .custom_pagination import CustomPaginator
from .filters import QuizFilter, QuestionFilter

###### Category #######

class CategoryList(APIView):
    paginator = CustomPaginator()
    # List of all categories
    def get(self, request, format=None):
        categories = Category.objects.all()
        # sr = CategorySerializer(categories, many=True)
        # return Response(sr.data)
        response = self.paginator.generate_response(categories, CategorySerializer, request)
        return response

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
    paginator = CustomPaginator()
    def get(self, request, format=None):
        filtered_questions = QuestionFilter(request.GET, queryset = Question.objects.all()).qs
        # questions = Question.objects.all()
        # sr = QuestionSerializer(quiestions, many=True)
        # return Response(sr.data)
        response = self.paginator.generate_response(filtered_questions, QuestionSerializer, request)
        return response

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
# class QuizFilter(filters.FilterSet):
#     class Meta:
#         model = Quiz
#         fields = ['category']

class QuizList(APIView):
    # List of all quizes
    paginator = CustomPaginator()

    def get(self, request, format=None):
        filtered_qiuzes = QuizFilter(request.GET, queryset = Quiz.objects.all()).qs
        # sr = QuizSerializer(filtered_qiuzes, many=True)

        # filter_backends = [filters.DjangoFilterBackend]
        # filterset_class = QuizFilter
        # quizes = Quiz.objects.all()
        response = self.paginator.generate_response(filtered_qiuzes, QuizSerializer, request)
        return response

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