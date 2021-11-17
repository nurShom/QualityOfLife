from django.urls import path, re_path
from . import views
from django.conf.urls import url

urlpatterns = [
    re_path(r'^api/posts/$', views.post_list),
    re_path(r'^api/posts/(\d+)$', views.post_detail),
]