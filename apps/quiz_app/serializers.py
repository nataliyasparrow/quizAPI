from rest_framework import serializers
from apps.quiz_app.models import Question, Quiz, Category

class CategorySerializer(serializers.HyperlinkedModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=True, max_length=100)
    # quizes = serializers.HyperlinkedRelatedField(many=True, view_name='quiz-detail', read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'title']

class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=True, max_length=100)
    class Meta:
        model = Question
        fields = ['id', 'content', 'category']

class QuizSerializer(serializers.HyperlinkedModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    # title = serializers.CharField(required=True, max_length=100)
    category = serializers.ReadOnlyField(source='category.title')
    class Meta:
        model = Quiz
        fields = ['id', 'title', 'category', 'timed', 'questions']



