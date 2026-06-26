from django.db import models

from jobs.models import Job
from accounts.models import User


class MockInterview(models.Model):

    candidate = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    question = models.TextField()

    answer = models.TextField()

    score = models.IntegerField(
        default=0
    )

    feedback = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.candidate.username