##### imports for regular App
# from django.shortcuts import render, redirect, HttpResponse
# from .models import Quiz, Question, Category
# import json

# from django.http import HttpResponse, JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# from rest_framework.parsers import JSONParser

# from .models import Quiz, Question, Category
# from .serializers import CategorySerializer, QuizSerializer
# from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework.decorators import action
###### Views for regular App

# def index(request):
#     # request.session.clear()
#     return render(request, "quiz_app/index.html")

# def category_select(request):

#     categories = Category.objects.all()
#     # quizes = Quiz.objects.all()
    
#     context = {
#         "categories": categories,
#         # "quizes": quizes,
#         # "flag": flag,
#     }
#     return render(request, "quiz_app/category_select.html", context)


# def quiz_select_by_category(request):
#     id = int(request.POST["selected_category"])
#     quizes = Quiz.objects.filter(category = Category.objects.get(id=id))
#     context = {
#         "quizes": quizes,
#     }
#     return render(request, "quiz_app/quiz_select.html", context)


# def show_quiz(request, id):
#     # quiz = Quiz.objects.first()
#     quiz = Quiz.objects.get(id = id)
#     questions = quiz.questions.all()
    
#     context = {
#         "quiz": quiz,
#         "questions": questions,
#     }
#     return render(request, "quiz_app/show_quiz.html", context)

# def check_quiz(request):
#     request.session.clear()
#     quiz_id = int(request.POST["quiz_id"])
#     quiz = Quiz.objects.get(id=quiz_id)
#     questions = quiz.questions.all()
#     count = questions.count()
#     score = 0
#     for q in questions:
#         # print(request.POST[str(q.id)])
#         # print(q.content['answers'][ q.content['correct_answer'] ])
#         if(request.POST[str(q.id)] == q.content['answers'][ q.content['correct_answer'] ]):
#             # print("equal")
#             score += 1
    
#     request.session['score'] = score
#     request.session['count'] = count

#     return redirect('/show_result')

# def show_score(request):
#     return render(request, "quiz_app/score.html")

####### App using Web API (functions View)

# @csrf_exempt
# def category_list(request):
#     if request.method == 'GET':
#         categories = Category.objects.all()
#         sr = CategorySerializer(categories, many=True)
#         return JsonResponse(sr.data, safe=False)

#     elif request.method == 'POST':
#         data = JSONParser().parse(request)
#         sr = CategorySerializer(data=data)
#         if sr.is_valid():
#             sr.save()
#             return JsonResponse(sr.data, status=201)
#         return JsonResponse(sr.errors, status=400)

# @csrf_exempt
# def category_detail(request, pk):
#     try:
#         category = Category.objects.get(pk=pk)
#     except Category.DoesNotExist:
#         return HttpResponse(status=404)

#     if request.method == 'GET':
#         sr = CategorySerializer(category)
#         return JsonResponse(sr.data)

#     elif request.method == 'PUT':
#         data = JSONParser().parse(request)
#         sr = CategorySerializer(category, data=data)
#         if sr.is_valid():
#             sr.save()
#             return JsonResponse(sr.data)
#         return JsonResponse(sr.errors, status=400)

#     elif request.method == 'DELETE':
#         category.delete()
#         return HttpResponse(status=204)

###### using classes and ViewSets

# class CategoryViewSet(viewsets.ModelViewSet):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer

# class QuestionViewSet(viewsets.ModelViewSet):
#     queryset = Question.objects.all()
#     serializer_class = CategorySerializer

# class QuizViewSet(viewsets.ModelViewSet):
#     queryset = Quiz.objects.all()
#     serializer_class = CategorySerializer


######## API using classes and APIView

####### Category #######

# class CategoryList(APIView):
#     # List of all categories
#     def get(self, request, format=None):
#         categories = Category.objects.all()
#         sr = CategorySerializer(categories, many=True)
#         return Response(sr.data)

#     # Create new category
#     def post(self, request, format=None):
#         sr = CategorySerializer(data=request.data)
#         if sr.is_valid():
#             sr.save()
#             return Response(sr.data, status=status.HTTP_201_CREATED)
#         return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

# class CategoryDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return Category.objects.get(pk=pk)
#         except Category.DoesNotExist:
#             raise Http404
    
#     # Retrieve category instance by id
#     def get(self, request, pk, format=None):
#         category = self.get_object(pk)
#         sr = CategorySerializer(category)
#         return Response(sr.data)

#     # Update category instance
#     def put(self, request, pk, format=None):
#         category = self.get_object(pk)
#         sr = CategorySerializer(category, data=request.data)
#         if sr.is_valid():
#             sr.save()
#             return Response(sr.data)
#         return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        
#     # Delete category instance
#     def delete(self, request, pk, format=None):
#         category = self.get_object(pk)
#         category.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# ####### Quiestion #######

# class QuestionList(APIView):
#     # List of all questions
#     def get(self, request, format=None):
#         quiestions = Question.objects.all()
#         sr = QuestionSerializer(quiestions, many=True)
#         return Response(sr.data)

#     # Create new question
#     def post(self, request, format=None):
#         sr = QuestionSerializer(data=request.data)
#         if sr.is_valid():
#             sr.save()
#             return Response(sr.data, status=status.HTTP_201_CREATED)
#         return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

# class QuestionDetail(APIView):
#     def get_object(self, pk):
#         try:
#             return Question.objects.get(pk=pk)
#         except Question.DoesNotExist:
#             raise Http404
    
#     # Retrieve question instance by id
#     def get(self, request, pk, format=None):
#         question = self.get_object(pk)
#         sr = QuestionSerializer(question)
#         return Response(sr.data)

#     # Update question instance
#     def put(self, request, pk, format=None):
#         question = self.get_object(pk)
#         sr = QuestionSerializer(question, data=request.data)
#         if sr.is_valid():
#             sr.save()
#             return Response(sr.data)
#         return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        
#     # Delete quiestion instance
#     def delete(self, request, pk, format=None):
#         question = self.get_object(pk)
#         question.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)


# ####### Quiz #######

# class QuizList(APIView):
#     # List of all quizes
#     def get(self, request, format=None):
#         quizes = Quiz.objects.all()
#         sr = QuizSerializer(quizes, many=True)

#         filter_backends = [DjangoFilterBackend]
#         filterset_fields = ['category']
        
#         return Response(sr.data)

#     # Create new quiz
#     def post(self, request, format=None):
#         sr = QuizSerializer(data=request.data)
#         if sr.is_valid():
#             sr.save()
#             return Response(sr.data, status=status.HTTP_201_CREATED)
#         return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)

# class QuizDetail(APIView):
    # def get_object(self, pk):
    #     try:
    #         return Quiz.objects.get(pk=pk)
    #     except Quiz.DoesNotExist:
    #         raise Http404
    
    # # Retrieve quiz instance by id
    # def get(self, request, pk, format=None):
    #     quiz = self.get_object(pk)
    #     sr = QuizSerializer(quiz)
    #     return Response(sr.data)

    # # Update quiz instance
    # def put(self, request, pk, format=None):
    #     quiz = self.get_object(pk)
    #     sr = QuizSerializer(category, data=request.data)
    #     if sr.is_valid():
    #         sr.save()
    #         return Response(sr.data)
    #     return Response(sr.errors, status=status.HTTP_400_BAD_REQUEST)
        
    # # Delete quiz instance
    # def delete(self, request, pk, format=None):
    #     quiz = self.get_object(pk)
    #     quiz.delete()
    #     return Response(status=status.HTTP_204_NO_CONTENT)


