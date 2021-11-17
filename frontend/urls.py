from django.urls import path
from . import views

urlpatterns = [
    # path('api/posts/', views.PostsApiView.as_view() ),
    path('', views.index ),
]