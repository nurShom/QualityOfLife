from django.db import models

# Create your models here.
class Posts(models.Model):
    title = models.CharField(max_length=100)
    bodytext = models.TextField()
    author = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True, editable=True)

