from django.conf.urls import url 
from user_api import views 
 
urlpatterns = [ 
    url(r'^user_register/$', views.user_register),
    url(r'^user_login/$', views.user_login),

]