####### urls for regular App
# from django.conf.urls import url
# from . import views

# urlpatterns = [
#         url(r'^$', views.index),
#         # url(r'^/category/(?P<id>\d+)$', views.show_quizes_list),
#         url(r'^category/select$', views.category_select),
#         url(r'^quiz/select_by_category$', views.quiz_select_by_category),
#         url(r'^quiz/take/(?P<id>\d+)$', views.show_quiz),
#         url(r'^submit_quiz$', views.check_quiz),
#         url(r'^show_result$', views.show_score),
# ]

###### urls for Web API
# from django.urls import path
# from . import views

# urlpatterns = [
#     path('categories/', views.category_list),
#     path('categories/<int:pk>/', views.category_detail),
# ]

####### using Router
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'categories', views.CategoryViewSet)
router.register(r'questions', views.QuestionViewSet)
router.register(r'quizes', views.QuizViewSet)

urlpatterns = [
    path('', include(router.urls)),
]