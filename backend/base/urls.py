from django.urls import path
from . import views
urlpatterns = [
    path('home/', views.homeview, name='home'),
    path('productDetail/<int:pk>/', views.product_detail_view, name='product_detail'),
]
