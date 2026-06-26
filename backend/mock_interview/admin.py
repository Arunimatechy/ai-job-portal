
from django.contrib import admin
from .models import MockInterview


@admin.register(MockInterview)
class MockInterviewAdmin(admin.ModelAdmin):

    list_display = (
        "candidate",
        "job",
        "score",
        "created_at",
    )

    list_filter = (
        "score",
        "created_at",
        "job",
    )

    search_fields = (
        "candidate__username",
        "candidate__email",
        "job__title",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 20