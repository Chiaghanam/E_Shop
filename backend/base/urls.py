from django.urls import path
from . import views
from .views import CustomTokenObtainPairView, Get_User, Get_User_Profile, Update_User_Profile, registerUser, addOrderItems, orderProfile, updateOrderToPay, getMyOrder
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('home/', views.homeview, name='home'),
    path('productDetail/<int:pk>/', views.product_detail_view, name='product_detail'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', Get_User, name='users'),
    path('users/profile/', Get_User_Profile, name='user-profile'),
    path('users/register/', registerUser, name='user-register'),
    path('users/update/', Update_User_Profile, name='user-update'), 
    path('orders/add/', addOrderItems, name='orders-add'),
    path('myorders/', getMyOrder, name='My_Orders'),
    path('orders/<str:pk>/',orderProfile, name='user-orders'),    
    path('orders/<str:pk>/pay', updateOrderToPay, name='pay'),    

]
