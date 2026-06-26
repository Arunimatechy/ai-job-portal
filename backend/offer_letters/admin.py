from django.contrib import admin
from .models import OfferLetter


@admin.register(OfferLetter)
class OfferLetterAdmin(admin.ModelAdmin):

    list_display = (
        "candidate",
        "job",
        "salary",
        "created_at",
    )

    list_filter = (
        "created_at",
    )

    search_fields = (
        "application__candidate__username",
        "application__candidate__email",
        "application__job__title",
    )

    ordering = (
        "-created_at",
    )

    list_per_page = 20

    def candidate(self, obj):
        return obj.application.candidate.username

    candidate.short_description = "Candidate"

    def job(self, obj):
        return obj.application.job.title

    job.short_description = "Job"