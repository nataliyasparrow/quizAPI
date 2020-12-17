from django.conf import settings
from django.conf.urls.static import static, serve
from django.contrib import admin
from django.urls import path, re_path, include
from rest_framework.routers import DefaultRouter

import apps.quiz_api.views
import apps.quiz_api.api_views

router = DefaultRouter()
router.register(r'categories', apps.quiz_api.views.CategoryViewSet)
router.register(r'questions', apps.quiz_api.views.QuestionViewSet)
router.register(r'quizes', apps.quiz_api.views.QuizViewSet)


urlpatterns = [
    path('', include('apps.frontend.urls')),

    re_path(r'^api/v2/', include(router.urls)),

    path('api/v1/categories', apps.quiz_api.api_views.CategoryList.as_view()),
    path('api/v1/categories/new', apps.quiz_api.api_views.CategoryCreate.as_view()),
    path('api/v1/categories/<int:id>/',
            apps.quiz_api.api_views.CategoryRetrieveUpdateDestroy.as_view()
        ),

    path('api/v1/questions', apps.quiz_api.api_views.QuestionList.as_view()),
    path('api/v1/questions/new', apps.quiz_api.api_views.QuestionCreate.as_view()),
    path('api/v1/questions/<int:id>/',
            apps.quiz_api.api_views.QuestionRetrieveUpdateDestroy.as_view()
        ),

    path('api/v1/quizes', apps.quiz_api.api_views.QuizList.as_view()),
    path('api/v1/quizes/new', apps.quiz_api.api_views.QuizCreate.as_view()),
    path('api/v1/quizes/<int:id>/',
            apps.quiz_api.api_views.QuizRetrieveUpdateDestroy.as_view()
        ),
    
    path('admin/', admin.site.urls),
    # re_path(r'^(?P<path>.*)$', serve, { 'document_root': settings.FRONTEND_ROOT }),
    # path('categories/<int:id>/',   apps.quiz_api.views.show, name='show-category'),
    # path('', apps.quiz_api.views.index, name='list-categories'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

