from rest_framework import serializers
from .models import Product
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
            name = obj.email
        return name    
      
    def get__id(self, obj):
        return obj.id
    
class userserializertoken(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'name', '_id', 'is_staff', 'token']
        
    def get_name(self, obj):
        name = obj.username
        if name == '':
            name = obj.email
        return name    
      
    def get__id(self, obj):
        return obj.id
    
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
    

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Run the default validation to get tokens
        data = super().validate(attrs)

        # Add extra fields to the response JSON
        serializer = userserializertoken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data



class productserializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'