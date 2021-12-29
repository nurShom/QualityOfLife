from django.urls import path
# from . import views
from . import views_vilanova

urlpatterns = [
    path('api/posts/', views_vilanova.PostsListApiView.as_view() ),
]