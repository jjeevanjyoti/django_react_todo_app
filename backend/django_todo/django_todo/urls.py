
from django.conf.urls import url, include 
 
urlpatterns = [ 
    url(r'^', include('todo_api.urls')), 
    url(r'^', include('user_api.urls')), 
]