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
from decimal import Decimal



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

@permission_classes(IsAdminUser)
@api_view(['DELETE'])
def product_delete(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('product deleted successfully')

@api_view(['POST'])
@permission_classes([IsAdminUser])
def product_create(request):
    user = request.user
    data = request.data
    image = request.FILES.get('image')

    required_fields = ['name', 'brand', 'category', 'description', 'price', 'countInStock']
    for field in required_fields:
        if field not in data:
            return Response({"detail": f"{field} is required."}, status=400)

    if not image:
        return Response({"detail": "image is required."}, status=400)

    try:
        # Convert price to Decimal safely
        price = Decimal(str(data['price']))

        product = Product.objects.create(
            user=user,
            name=data['name'],
            brand=data['brand'],
            category=data['category'],
            description=data['description'],
            price=price,
            countInStock=data['countInStock'],
            image=image,
        )
        serializer = productserializer(product, many=False)
        return Response(serializer.data)
    except Exception as e:
        import traceback
        print("Error creating product:", e)
        traceback.print_exc()
        return Response({"detail": str(e)}, status=500)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def product_edit(request, pk):
    user = request.user
    data = request.data

    try:
        product = Product.objects.get(pk=pk)

        product.user = user
        product.name = data.get('name', product.name)
        product.brand = data.get('brand', product.brand)
        product.category = data.get('category', product.category)
        product.description = data.get('description', product.description)
        product.price = Decimal(str(data.get('price', product.price)))
        product.countInStock = data.get('countInStock', product.countInStock)

        if 'image' in request.FILES:
            product.image = request.FILES['image']

        product.save()
        serializer = productserializer(product, many=False)
        return Response(serializer.data)

    except Product.DoesNotExist:
        return Response({"detail": "Product not found."}, status=404)
    except Exception as e:
        return Response({"detail": str(e)}, status=500)
    
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

@permission_classes([IsAdminUser])
@api_view(['GET'])
def getOrder(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)