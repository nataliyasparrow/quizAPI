from rest_framework import serializers

from apps.quiz_api.models import Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title', 'description', 'created_at', 'updated_at')