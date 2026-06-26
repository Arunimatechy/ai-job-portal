from rest_framework import serializers
from .models import OfferLetter

class OfferLetterSerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = OfferLetter

        fields = [
            "id",
            "application",
            "salary",
            "content",
            "created_at",
        ]