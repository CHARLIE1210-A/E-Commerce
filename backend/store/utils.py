# utils.py
from twilio.rest import Client
from django.conf import settings

def send_otp_via_twilio(mobile, otp):
    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
    message = client.messages.create(
        body=f"Your verification code is {otp}",
        from_=settings.TWILIO_PHONE_NUMBER,
        to=mobile
    )
    return message.sid
