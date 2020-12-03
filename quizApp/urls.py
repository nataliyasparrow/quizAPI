from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

import apps.quiz_api.views
import apps.quiz_api.api_views

urlpatterns = [
    path('', include('apps.frontend.urls')),

    path('api/v1/categories', apps.quiz_api.api_views.CategoryList.as_view()),
    path('api/v1/categories/new', apps.quiz_api.api_views.CategoryCreate.as_view()),
    path('api/v1/categories/<int:id>/',
            apps.quiz_api.api_views.ProductRetrieveUpdateDestroy.as_view()
        ),
    
    path('admin/', admin.site.urls),
    path('categories/<int:id>/',   apps.quiz_api.views.show, name='show-category'),
    path('', apps.quiz_api.views.index, name='list-categories'),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

