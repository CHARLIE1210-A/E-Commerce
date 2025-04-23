import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from django.utils import timezone
from rest_framework.decorators import api_view
from .models import User, Product, Cart, Order
from .serializers import UserSerializer, ProductSerializer, CartSerializer, OrderSerializer
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from .utils import send_otp_via_twilio
from django.db.models import Sum
class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return  # No-op to bypass CSRF check
# ------------------- AUTH -------------------

class LoginAPIView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = [AllowAny]
    
    def post(self, request):
        mobile = request.data.get('mobile')
        
        if not mobile:
            return Response({'error': 'Mobile number required'}, status=400)

        # Add +91 if not already present
        if not mobile.startswith('+'):
            mobile = '+91' + mobile

        # Create or get the user
        user, created = User.objects.get_or_create(mobile=mobile)

        # Generate 6-digit OTP
        otp = str(random.randint(100000, 999999))

        try:
            # Send OTP using Twilio
            send_otp_via_twilio(mobile, otp)

            # Save OTP & timestamp in user model (optional: temp DB or Redis)
            user.otp = otp
            user.otp_created_at = timezone.now()
            user.save()

            return Response({
                'message': 'OTP sent successfully',
                'user_id': user.id
            })
        except Exception as e:
            return Response({'error': f'Failed to send OTP: {str(e)}'}, status=500)


class VerifyOTPAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        mobile = request.data.get('mobile')
        if not mobile.startswith('+'):
            mobile = '+91' + mobile

        otp = request.data.get('otp')

        if not mobile or not otp:
            return Response({'error': 'Mobile number and OTP are required'}, status=400)

        try:
            user = User.objects.get(mobile=mobile)
        except User.DoesNotExist:
            return Response({'error': 'User not found'}, status=404)

        if user.is_otp_valid(otp):
            # Optionally: clear the OTP after successful verification
            user.otp = None
            user.otp_created_at = None
            user.save()

            return Response({
                'message': 'OTP verified',
                'user': {
                    'id': user.id,
                    'mobile': user.mobile,
                    'full_name': user.full_name
                }
            })
        else:
            return Response({'error': 'Invalid or expired OTP'}, status=400)     

# ------------------- PRODUCT -------------------

class ProductListAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.request.query_params.get('category')
        sold = self.request.query_params.get('sold')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if category:
            queryset = queryset.filter(category__icontains=category)
        if sold is not None:
            queryset = queryset.filter(sold=(sold.lower() == 'true'))
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)
        return queryset


class ProductDetailAPIView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductSearchAPIView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        search = self.request.query_params.get('search', '')
        return Product.objects.filter(title__icontains=search)


# ------------------- CART -------------------

class AddToCartAPIView(APIView):
    authentication_classes = (CsrfExemptSessionAuthentication, BasicAuthentication)
    permission_classes = [AllowAny]
    
    def post(self, request):
        user_id = request.data.get('user_id')
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        user = User.objects.get(id=user_id)
        product = Product.objects.get(id=product_id)
        cart_item, created = Cart.objects.get_or_create(user=user, product=product)
        cart_item.quantity += int(quantity)
        cart_item.save()
        return Response({'message': 'Product added to cart'})


class UpdateCartAPIView(APIView):
    def post(self, request, pk):
        action = request.data.get('action')
        cart_item = Cart.objects.get(pk=pk)
        if action == 'increase':
            cart_item.quantity += 1
        elif action == 'decrease' and cart_item.quantity > 1:
            cart_item.quantity -= 1
        cart_item.save()
        return Response({'message': 'Cart updated'})


class DeleteCartAPIView(APIView):
    def delete(self, request, pk):
        Cart.objects.filter(pk=pk).delete()
        return Response({'message': 'Product removed from cart'})

# To list cart items per user
class CartListAPIView(APIView):
    def get(self, request, user_id):
        items = Cart.objects.filter(user_id=user_id)
        serializer = CartSerializer(items, many=True)
        return Response(serializer.data)

# ------------------- ORDER -------------------

class CreateOrderAPIView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity'))
        payment_mode = request.data.get('payment_mode')

        product = Product.objects.get(id=product_id)
        order = Order.objects.create(
            user_id=user_id,
            product=product,
            price=product.price,
            quantity=quantity,
            payment_mode=payment_mode
        )
        return Response({'message': 'Order placed', 'order_id': order.id})


class OrderDetailAPIView(generics.RetrieveAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


class CancelOrderAPIView(APIView):
    def post(self, request, pk):
        Order.objects.filter(id=pk).delete()
        return Response({'message': 'Order cancelled'})
    

class TopPurchasedProductsAPIView(APIView):
    def get(self, request):
        top_products = (
            Order.objects
            .values(
                'product__id',
                'product__title',
                'product__image_url',
                'product__price',
                'product__description',
                'product__category',
                'product__sold',
                'product__is_sale',
            )
            .annotate(total_quantity=Sum('quantity'))
            .order_by('-total_quantity')[:5]
        )

        # Optional: Format keys to be more readable
        formatted = [
            {
                'id': item['product__id'],
                'title': item['product__title'],
                'image_url': item['product__image_url'],
                'price': item['product__price'],
                'category': item['product__category'],
                'sold': item['product__sold'],  
                'is_sale': item['product__is_sale'],
                'description': item['product__description'],
                'total_quantity': item['total_quantity']
            }
            for item in top_products
        ]

        return Response(formatted)
