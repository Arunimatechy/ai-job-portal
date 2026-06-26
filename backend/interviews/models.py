from django.db import models
from jobs.models import Job
from applications.models import Application


class Interview(models.Model):

    STATUS_CHOICES = (
        ("scheduled", "Scheduled"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    )

    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name="interview"
    )

    scheduled_at = models.DateTimeField()

    meeting_link = models.URLField(
        blank=True
    )

    notes = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="scheduled"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            f"{self.application.candidate.username}"
            f" - {self.application.job.title}"
        )

class InterviewKit(models.Model):

    job = models.OneToOneField(
        Job,
        on_delete=models.CASCADE,
        related_name="interview_kit"
    )

    technical_questions = models.JSONField(
        default=list
    )

    behavioral_questions = models.JSONField(
        default=list
    )

    role_based_questions = models.JSONField(
        default=list
    )

    difficulty = models.CharField(
        max_length=20,
        default="medium"
    )

    summary = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.job.title
