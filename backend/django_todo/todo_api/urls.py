from django.conf.urls import url 
from todo_api import views 
 
urlpatterns = [ 
    url(r'^todos/$', views.todo_list),
    url(r'^todos/(?P<pk>[0-9]+)$', views.todo_detail),
    url(r'^alltodos/$', views.all_todos),

]