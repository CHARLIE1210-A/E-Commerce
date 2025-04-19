from rest_framework import generics
from rest_framework.views import APIView
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer
from rest_framework.response import Response

class ProductList(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CategoryList(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class ConstantProductView(APIView):
    def get(self, request):
        products = [
            {"id": 1, "name": "Shoes", "price": "1200.00"},
            {"id": 2, "name": "T-Shirt", "price": "750.00"},
            {"id": 3, "name": "Bag", "price": "999.00"},
        ]
        return Response(products)