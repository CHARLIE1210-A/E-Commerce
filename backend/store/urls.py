from django.urls import path
from .views import ProductList, CategoryList, ConstantProductView

urlpatterns = [
    # path('products/', ProductList.as_view()),
    # path('categories/', CategoryList.as_view()),
    path('products/', ConstantProductView.as_view(), name='product-list'),
]
