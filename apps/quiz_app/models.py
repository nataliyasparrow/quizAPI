from __future__ import unicode_literals
from django.db import models
# from django_mysql import models
from django_mysql.models import JSONField, Model
# from django.db import models, JSONField
from django.utils import timezone



class Category(models.Model):
    title = models.CharField(max_length=40)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # created_at = models.DateTimeField(default=timezone.now)
    # updated_at = models.DateTimeField(default=timezone.now)
    def __repr__(self):
        return f"<Category object: {self.title} ({self.id})>"

class Question(models.Model):
    content = JSONField()
    category = models.ForeignKey(Category, related_name="questions", on_delete=models.CASCADE)
    # quiz = models.ForeignKey(Quiz, related_name="questions", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __repr__(self):
        return f"<Question object: {self.id}>"


class Quiz(models.Model):
    title = models.CharField(max_length=40)
    # difficulty = models.IntegerField()
    timed = models.BooleanField(default="False")
    category = models.ForeignKey(Category, related_name="quizes", on_delete=models.CASCADE)
    questions = models.ManyToManyField(Question, related_name="quizes")
    # questions = JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __repr__(self):
        return f"<Quiz object: {self.title} ({self.id})>"



# class Answer(models.Model):
#     content = models.TextField()
#     # is_correct = models.BooleanField()
#     question = models.ForeignKey(Question, related_name="answers", on_delete=models.CASCADE)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
