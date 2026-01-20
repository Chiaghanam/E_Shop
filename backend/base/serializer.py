from rest_framework import serializers
from .models import Product
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Run the default validation to get tokens
        data = super().validate(attrs)

        # Add extra fields to the response JSON
        data['username'] = self.user.username
        data['email'] = self.user.email

        return data



class productserializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'