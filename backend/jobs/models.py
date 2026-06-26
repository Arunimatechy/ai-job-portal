
from django.db import models
from django.conf import settings


class Job(models.Model):

    JOB_TYPES = (
        ("full_time", "Full Time"),
        ("part_time", "Part Time"),
        ("internship", "Internship"),
        ("remote", "Remote"),
    )

    title = models.CharField(
        max_length=255
    )

    company = models.CharField(
        max_length=255
    )

    description = models.TextField()

    skills_required = models.TextField()

    salary = models.CharField(
        max_length=100
    )

    location = models.CharField(
        max_length=255
    )

    experience = models.CharField(
        max_length=100
    )

    job_type = models.CharField(
        max_length=50,
        choices=JOB_TYPES
    )

    deadline = models.DateField()

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="jobs"
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title