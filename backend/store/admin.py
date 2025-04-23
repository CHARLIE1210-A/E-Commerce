from django.contrib import admin
from .models import User, Product, Cart, Order

class UserAdmin(admin.ModelAdmin):
    list_display = ('id', 'mobile', 'full_name', 'otp', 'otp_created_at')
    search_fields = ('mobile', 'full_name')
    readonly_fields = ('otp', 'otp_created_at') 

class ProductAdmin(admin.ModelAdmin):
    list_display = ('title', 'price', 'category', 'sold', 'is_sale', 'date_of_sale')
    search_fields = ('title', 'category')
    list_filter = ('sold', 'is_sale', 'category')
    
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'product', 'price', 'quantity', 'payment_mode')
    list_filter = ('payment_mode',)
    search_fields = ('user__username', 'product__title')
    autocomplete_fields = ('user', 'product')
    
class CartAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'quantity')
    list_filter = ('user',)
    search_fields = ('user__username', 'product__title')
    ordering = ('user',)
       
admin.site.register(User, UserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart, CartAdmin)
admin.site.register(Order, OrderAdmin)
