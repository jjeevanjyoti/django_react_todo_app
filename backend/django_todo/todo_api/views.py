from django.shortcuts import render
from django.http import HttpResponse
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser 
from rest_framework import status


from todo_api.models import Todo
from todo_api.serializers import TodoSerializer
# Create your views here.

# @csrf_exempt
# def all_todos(request,value):
#     if request.method == 'get':
#         print(value)
#         todos = Todo.objects.filter(username=value)
#         print(todos)
#         todos_serializer = TodoSerializer(todos, many=True)
#         return JsonResponse(todos_serializer.data, safe=False)
#         # In order to serialize objects, we must set 'safe=False

@csrf_exempt
def all_todos(request):
    if request.method == 'POST':
        todo_data = JSONParser().parse(request)
        print(todo_data)
        todos = Todo.objects.filter(username=todo_data['username'])
        print(todos)
        todos_serializer = TodoSerializer(todos, many=True)
        return JsonResponse(todos_serializer.data, safe=False) 


@csrf_exempt
def todo_list(request):
    if request.method == 'POST':
        todo_data = JSONParser().parse(request)
        print (todo_data)
        todo_serializer = TodoSerializer(data=todo_data['todo'])
        if todo_serializer.is_valid():
            todo_serializer.save()
            return JsonResponse(todo_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt 
def todo_detail(request, pk):
    try: 
        todo = Todo.objects.get(pk=pk) 
    except Todo.DoesNotExist: 
        return HttpResponse(status=status.HTTP_404_NOT_FOUND) 
 
    if request.method == 'GET': 
        todo_serializer = TodoSerializer(todo) 
        return JsonResponse(todo_serializer.data) 
 
    elif request.method == 'PUT': 
        todo_data = JSONParser().parse(request) 
        todo_serializer = TodoSerializer(todo, data=todo_data['todo']) 
        if todo_serializer.is_valid(): 
            todo_serializer.save() 
            return JsonResponse(todo_serializer.data) 
        return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
    elif request.method == 'DELETE':
        todo.delete() 
        return HttpResponse(status=status.HTTP_204_NO_CONTENT)

