from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Posts
from .serializers import *

@api_view(['GET', 'POST'])
def post_list(request):
    # Get all posts
    if request.method == 'GET':
        data = Posts.objects.all()
        serializer = PostsSerializer(data, context={'request': request}, many=True)

        return Response(serializer.data)

    # Create a new post 
    elif request.method == 'POST':
        serializer = PostsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE', 'GET'])
def post_detail(request, id):
    # print(id)
    # print(Posts.objects.values_list('id', flat=True))
    try:
        post = Posts.objects.get(id=id)
    except Posts.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # Edit an existing post
    if request.method == 'PUT':
        serializer = PostsSerializer(post, data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Delete an existing post
    elif request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    # Retrieve an existing post
    elif request.method == 'GET':
        serializer = PostsSerializer(post, context={'request': request})
        return Response(serializer.data)