from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from apps.quiz_app import views

urlpatterns = [
    path('categories/', views.CategoryList.as_view()),
    path('categories/<int:pk>/', views.CategoryDetail.as_view()),
    path('questions/', views.QuestionList.as_view()),
    path('questions/<int:pk>/', views.QuestionDetail.as_view()),
    path('quizes/', views.QuizList.as_view()),
    path('quizes/<int:pk>/', views.QuizDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)