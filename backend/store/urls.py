from django.urls import path
from . import views

urlpatterns = [
    # Product endpoints
    path('products/', views.ProductListAPIView.as_view(), name='product-list'),
    path('products/<int:pk>/', views.ProductDetailAPIView.as_view(), name='product-detail'),
    path('products/search/', views.ProductSearchAPIView.as_view(), name='product-search'),
    
    # Cart endpoints
    path('cart/add/', views.AddToCartAPIView.as_view(), name='add-to-cart'),
    path('cart/<int:pk>/update/', views.UpdateCartAPIView.as_view(), name='update-cart'),
    path('cart/<int:pk>/delete/', views.DeleteCartAPIView.as_view(), name='delete-cart'),
    path('cart/user/<int:user_id>/', views.CartListAPIView.as_view(), name='cart-list'),


    # Order endpoints
    path('orders/create/', views.CreateOrderAPIView.as_view(), name='create-order'),
    path('orders/<int:pk>/', views.OrderDetailAPIView.as_view(), name='order-detail'),
    path('orders/<int:pk>/cancel/', views.CancelOrderAPIView.as_view(), name='cancel-order'),
    path('orders/top-products/', views.TopPurchasedProductsAPIView.as_view(), name='top-products'),


    # Authentication (stub for OTP login if using it later)
    path('auth/login/', views.LoginAPIView.as_view(), name='login'),
    path('auth/verify/', views.VerifyOTPAPIView.as_view(), name='verify_otp'),

]
