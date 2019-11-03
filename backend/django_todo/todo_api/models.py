from django.db import models

# Create your models here.
class  Todo(models.Model):
    username = models.CharField(max_length=50)
    title = models.CharField(max_length=50)
    desc = models.CharField(max_length=256)
    completed = models.BooleanField(default=False)