from django.urls import path
from . import views
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView



urlpatterns = [
    path('home/', views.homeview, name='home'),
    path('productDetail/<int:pk>/', views.product_detail_view, name='product_detail'),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
