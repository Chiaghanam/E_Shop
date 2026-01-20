from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Product
from .serializer import productserializer 
from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer, userserializer, userserializertoken
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status




class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer



@api_view(['GET','POST']) 
def homeview(request):
    query = Product.objects.all()
    serializer = productserializer(query, many=True)
    return Response(serializer.data) 
@api_view(['GET','POST'])
def product_detail_view(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = productserializer(product)
    return Response(serializer.data)

@api_view(['GET','POST']) 
@permission_classes([IsAdminUser])
def Get_User(request):
    query = User.objects.all()
    serializer = userserializer(query, many=True)
    return Response(serializer.data) 

@api_view(['GET','POST']) 
@permission_classes([IsAuthenticated])
def Get_User_Profile(request):
    user = request.user
    serializer = userserializertoken(user, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create_user(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
        )
        serializer = userserializertoken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)