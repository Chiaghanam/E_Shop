from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Product(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.DO_NOTHING)
    name = models.CharField(max_length=200, blank=True, null= True)
    image = models.ImageField(upload_to='image/', blank=True, null= True )
    brand = models.CharField(max_length=200, blank=True, null= True)
    category = models.CharField(max_length=200, blank=True, null= True)
    description = models.TextField(blank=True, null= True)
    rating = models.DecimalField(max_digits= 7, decimal_places=2)
    numReviews = models.IntegerField(blank=True, null= True, default=0)
    price = models.DecimalField(max_digits= 7, decimal_places=2)
    countInStock = models.IntegerField(default=0, blank=True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return str(self.name)

class Review(models.Model):
    Product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null= True)
    rating = models.IntegerField(default=0, blank=True, null= True)
    comment = models.TextField(blank=True, null= True)
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return str(self.name)
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    paymentMethod= models.CharField(max_length=200, blank=True, null= True)
    taxPrice =  models.DecimalField(max_digits= 7, decimal_places=2)
    shoppingPrice =  models.DecimalField(max_digits= 7, decimal_places=2, null=True, blank=True)
    totalPrice =  models.DecimalField(max_digits= 7, decimal_places=2, null=True, blank=True)
    isPaid = models.BooleanField(default=False)
    paidAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    isDelivered = models.BooleanField(default=False)
    delieveredAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return str(self.createdAt)
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    product =  models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, blank=True, null= True)
    quantity = models.IntegerField(default=0, blank=True, null= True)
    price = models.DecimalField(max_digits= 7, decimal_places=2)
    image = models.ImageField(upload_to='image/', blank=True, null= True )
    _id = models.AutoField(primary_key=True, editable=False)
    
    def __str__(self):
        return str(self.name)
    
class ShippingAddress(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=200, blank=True, null= True)
    city = models.CharField(max_length=200, blank=True, null= True)
    postalCode = models.CharField(max_length=200, blank=True, null= True)
    country = models.CharField(max_length=200, blank=True, null= True)
    shippingPrice = models.DecimalField(max_digits= 7, decimal_places=2)
    _id = models.AutoField(primary_key=True, editable=False)    
    
    def __str__(self):
        return str(self.address)