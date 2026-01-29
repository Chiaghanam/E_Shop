from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .models import Product, Order, OrderItem, ShippingAddress
from .serializer import productserializer 
from rest_framework.permissions import IsAuthenticated
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializer import CustomTokenObtainPairSerializer, userserializer, userserializertoken, OrderSerializer, productserializer,  orderitemserializer, shippingaddressserializer
from django.contrib.auth.models import User
from rest_framework import status
from datetime import datetime




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

@api_view(['DELETE']) 
@permission_classes([IsAdminUser])
def Delete_User(request, pk):
    query = User.objects.get(id=pk)
    query.delete()
    return Response('user deleted') 

@api_view(['GET','PUT']) 
@permission_classes([IsAdminUser])
def Admin_Update_User(request, pk):
    try:
        user = User.objects.get(id=pk)
    except User.DoesNotExist:
        return Response(status=404) \
    
    if request.method == 'PUT':
        serializer = userserializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    
    serializer = userserializer(user)
    return Response(serializer.data)



@api_view(['GET','POST']) 
@permission_classes([IsAuthenticated])
def Get_User_Profile(request):
    user = request.user
    serializer = userserializertoken(user, many=False)
    return Response(serializer.data)


@api_view(['Put','POST']) 
@permission_classes([IsAuthenticated])
def Update_User_Profile(request):
    user = request.user
    serializer = userserializertoken(user, many=False)
    data = request.data
    user.first_name = data['name']
    user.email = data['email']
    if data['password'] != '':
        user.set_password(data['password']) 
    user.save()
    
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    data = request.data
    try:
        user = User.objects.create_user(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=data['password']
        )
        serializer = userserializertoken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    data = request.data
    user = request.user
    order_data = data.get('orderData', {})

    orderitems = order_data.get('orderItems', [])

    if not orderitems or len(orderitems) == 0:
        message = {'detail': 'No Order Items'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    else:
        order = Order.objects.create(
             user=user,
             paymentMethod=order_data.get('paymentMethod'),
             taxPrice=order_data.get('taxPrice'),
             shippingPrice=order_data.get('shippingPrice'),
             totalPrice=order_data.get('totalPrice')
            )

        shipping = ShippingAddress.objects.create(
            order=order,
            address=order_data['shippingAddress']['address'],
            city=order_data['shippingAddress']['city'],
            postalCode=order_data['shippingAddress']['postalCode'],
            state=order_data['shippingAddress']['state'],
            country=order_data['shippingAddress']['country'],
            shippingPrice=order_data['shippingPrice']
            )

        
        for i in orderitems:
            product = Product.objects.get(_id=i['product'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                quantity=i['qty'],
                price=i['price'],
                image=product.image.url,
            )
            product.countInStock -= item.quantity
            product.save()
        
        serializer = OrderSerializer(order, many=False)
        return Response(serializer.data)
    

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def orderProfile(request, pk):
    user = request.user
    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many = False)
            return Response(serializer.data)
        else:
            return Response({"detail": "Not authorized to view this order"}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({"detail": "Order not found"})
    
@permission_classes([IsAuthenticated])
@api_view(['PUT'])
def updateOrderToPay(request, pk):
    getOrder = Order.objects.get(_id=pk)
    getOrder.isPaid = True
    getOrder.paidAt =  datetime.now()
    getOrder.save()
    
    return('is paid')  

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getMyOrder(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)