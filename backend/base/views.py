from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Product
from .serializer import productserializer 
# Create your views here.
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