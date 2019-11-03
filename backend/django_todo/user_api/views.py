from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status


from user_api.models import User
from user_api.serializers import UserSerializer


@csrf_exempt
def user_register(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_data= user_data['user']
        print (user_data) 
        user = User.objects.filter(username=user_data['username'],password=user_data['password'])
        if not user:
            user_serializer = UserSerializer(data=user_data)
            if user_serializer.is_valid():
                user_serializer.save()
                return JsonResponse(user_serializer.data, status=status.HTTP_201_CREATED)
            return JsonResponse(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            data={"msg":"user already have registered"}
            return JsonResponse(data)

@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        user_data = JSONParser().parse(request)
        user_data=user_data['user']
        user = User.objects.filter(username=user_data['username'],password=user_data['password'])
        if user:
            data={"msg":"login successfull!","login":True}
            return JsonResponse(data)
        else:
            data={"msg":"login failed","login":False}
            return JsonResponse(data)





