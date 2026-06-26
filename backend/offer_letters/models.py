from django.db import models
from applications.models import Application

class OfferLetter(models.Model):

    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name="offer_letter"
    )

    salary = models.CharField(
        max_length=50
    )

    content = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.application.candidate.username