from django.contrib import admin
from .models import Job


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):

    list_display = (
        "title",
        "company",
        "location",
        "job_type",
        "salary",
        "deadline",
        "created_by",
        "created_at",
    )

    list_filter = (
        "job_type",
        "location",
        "created_at",
    )

    search_fields = (
        "title",
        "company",
        "location",
        "created_by__username",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 20