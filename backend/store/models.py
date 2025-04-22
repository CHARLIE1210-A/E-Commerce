from django.db import models
from django.utils import timezone
class User(models.Model):
    mobile = models.CharField(max_length=15, unique=True)
    full_name = models.CharField(max_length=100)

    # Add these two fields for OTP login
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    
    def __str__(self):
        return self.full_name or self.mobile
    
    def is_otp_valid(self, otp):
        """Check if the provided OTP is valid and not expired."""
        if self.otp != otp:
            return False
        if not self.otp_created_at:
            return False
        now = timezone.now()
        return (now - self.otp_created_at).total_seconds() <= 300  # 5 minutes


class Product(models.Model):
    title = models.CharField(max_length=100)
    price = models.FloatField()
    description = models.TextField()
    category = models.CharField(max_length=50)
    image_url = models.URLField(default="https://via.placeholder.com/150")
    sold = models.BooleanField(default=False)
    is_sale = models.BooleanField(default=False)
    date_of_sale = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.title

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f"{self.user.full_name} - {self.product.title}"

class Order(models.Model):
    PAYMENT_CHOICES = (
        ('COD', 'Cash on Delivery'),
        ('ONLINE', 'Online Payment'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.FloatField()
    quantity = models.PositiveIntegerField()
    payment_mode = models.CharField(max_length=10, choices=PAYMENT_CHOICES)

    def __str__(self):
        return f"Order #{self.id} by {self.user.full_name}"
