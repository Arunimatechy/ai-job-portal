from django.contrib import admin
from .models import Interview, InterviewKit


@admin.register(Interview)
class InterviewAdmin(admin.ModelAdmin):
    list_display = (
        "application",
        "scheduled_at",
        "status",
        "created_at",
    )

    list_filter = (
        "status",
    )

    search_fields = (
        "application__candidate__username",
        "application__job__title",
    )

    ordering = (
        "-scheduled_at",
    )


@admin.register(InterviewKit)
class InterviewKitAdmin(admin.ModelAdmin):
    list_display = (
        "job",
        "difficulty",
        "created_at",
    )

    search_fields = (
        "job__title",
    )

    ordering = (
        "-created_at",
    )