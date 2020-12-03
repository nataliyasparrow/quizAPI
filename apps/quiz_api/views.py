from django.shortcuts import render

from apps.quiz_api.models import Category, Question

def index(request):
    context = {
        'categories': Category.objects.all(),
        'questions': Question.objects.all(),
    }
    return render(request, 'quiz_api/category_list.html', context)

def show(request, id):
    context = {
        'category': Category.objects.get(id=id),
    }
    return render(request, 'quiz_api/category.html', context)
