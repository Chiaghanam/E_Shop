from rest_framework import serializers
from .models import Product, OrderItem, Order, Review, ShippingAddress
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken


class userserializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', '_id', 'is_staff']
        
    def get_name(self, obj):
        name = obj.username
        if name == '':
            name = obj.first_name
        return name    
      
    def get__id(self, obj):
        return obj.id
    
class userserializertoken(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', '_id', 'is_staff']
        
    def get_name(self, obj):
        name = obj.username
        if not name or name == None or name == '':
            name = obj.first_name
        return name    
      
    def get__id(self, obj):
        return obj.id
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Run the default validation to get tokens
        data = super().validate(attrs)

        # Add extra fields to the response JSON
        serializer = userserializertoken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'
    

class productserializer(serializers.ModelSerializer):
    Review = serializers.SerializerMethodField(read_only=True)
    image = serializers.SerializerMethodField()  # ADD THIS

    class Meta:
        model = Product
        fields = '__all__'

    def get_image(self, obj):  
        if obj.image:
            return obj.image.url  
        return None

    def get_Review(self, obj):
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)
        return serializer.data

    def validate_price(self, value):
        if value is None:
            raise serializers.ValidationError("Price is required.")
        if value < 0:
            raise serializers.ValidationError("Price cannot be negative.")
        if len(str(value).split('.')[0]) > 5:
            raise serializers.ValidationError("Price exceeds the maximum allowed digits.")
        return value
        
class orderitemserializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    
    class Meta:
        model = OrderItem
        fields = '__all__'
    
    def get_image(self, obj):
        if obj.image:
            return obj.image.url
        return None
  
class shippingaddressserializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'                        
        
        
class OrderSerializer(serializers.ModelSerializer):
    orderitem = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__'

    def get_orderitem(self, obj):
        items = obj.orderitem_set.all()
        serializer = orderitemserializer(items, many=True)
        return serializer.data

    def get_shippingAddress(self, obj):
        try:
            shipping = obj.shippingaddress_set.first()  
            serializer = shippingaddressserializer(shipping, many=False)
            return serializer.data
        except:
            return None


    def get_user(self, obj):
        user = obj.user
        serializer = userserializer(user, many=False)
        return serializer.data

