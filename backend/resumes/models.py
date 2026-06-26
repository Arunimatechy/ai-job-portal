from django.db import models
from django.conf import settings


class Resume(models.Model):

    candidate = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="resume"
    )

    resume_url = models.URLField()

    extracted_text = models.TextField(
        blank=True
    )

    uploaded_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.candidate.username