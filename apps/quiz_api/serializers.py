from rest_framework import serializers

from apps.quiz_api.models import Category, Question, Quiz

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'title', 'description', 'created_at', 'updated_at')

class QuestionSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.title')
    class Meta:
        model = Question
        fields = ['id', 'category', 'content']

class QuizSerializer(serializers.HyperlinkedModelSerializer):
# class QuizSerializer(serializers.ModelSerializer):
    category = serializers.ReadOnlyField(source='category.title')
    questions = QuestionSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'category', 'timed', 'questions']
