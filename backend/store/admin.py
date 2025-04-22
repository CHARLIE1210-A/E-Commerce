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
admin.site.register(User, UserAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Cart)
admin.site.register(Order)
