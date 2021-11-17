from rest_framework import generics
from .serializers import PostsSerializer
from .models import Posts

# Create your views here.
class PostsListApiView(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostsSerializer
