from rest_framework import serializers

from apps.quiz_api.models import Category, Question, Quiz

class CategorySerializer(serializers.ModelSerializer):
    # quizes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ['id', 'title', 'description', 'created_at', 'updated_at']
        read_only_fields = ['created_at','updated_at']

class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model=Quiz
        fields=['id', 'title', 'category', 'timed', 'questions', 'description']
        read_only_fields = ['created_at','updated_at']

    def to_representation(self, instance):
        self.fields['category'] =  CategorySerializer(read_only=True)
        return super(QuizSerializer, self).to_representation(instance)

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model=Question
        fields = ['id', 'category', 'quiz', 'content', 'multiple']
        read_only_fields = ['created_at','updated_at']

    def to_representation(self, instance):
        self.fields['category'] =  CategorySerializer(read_only=True)
        self.fields['quiz'] =  QuizSerializer(read_only=True)
        return super(QuestionSerializer, self).to_representation(instance)

# # class QuizSerializer(serializers.HyperlinkedModelSerializer):
# class QuizSerializer(serializers.ModelSerializer):
#     category = serializers.ReadOnlyField(source='category.title')
#     questions = QuestionSerializer(many=True, read_only=True)
#     class Meta:
#         model = Quiz
#         fields = ['id', 'title', 'category', 'timed', 'questions', 'description']
