from django.contrib import admin
from .models import Resume


@admin.register(Resume)
class ResumeAdmin(admin.ModelAdmin):

    list_display = (
        "id",
        "candidate",
        "resume_url",
        "uploaded_at",
    )

    search_fields = (
        "candidate__username",
        "candidate__email",
    )

    list_filter = (
        "uploaded_at",
    )

    readonly_fields = (
        "uploaded_at",
    )

    ordering = (
        "-uploaded_at",
    )

    list_per_page = 20

    fieldsets = (
        (
            "Candidate Information",
            {
                "fields": (
                    "candidate",
                    "resume_url",
                )
            },
        ),
        (
            "Resume Content",
            {
                "fields": (
                    "extracted_text",
                )
            },
        ),
        (
            "Upload Information",
            {
                "fields": (
                    "uploaded_at",
                )
            },
        ),
    )