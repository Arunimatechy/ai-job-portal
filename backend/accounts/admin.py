from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import (
    User,
    CandidateProfile,
    RecruiterProfile,
)


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = (
        "username",
        "email",
        "role",
        "is_staff",
        "is_active",
    )

    list_filter = (
        "role",
        "is_staff",
        "is_active",
    )

    search_fields = (
        "username",
        "email",
    )

    ordering = (
        "username",
    )

    fieldsets = UserAdmin.fieldsets + (
        (
            "Role Information",
            {
                "fields": ("role",),
            },
        ),
    )

    add_fieldsets = UserAdmin.add_fieldsets + (
        (
            "Role Information",
            {
                "fields": (
                    "email",
                    "role",
                ),
            },
        ),
    )


@admin.register(CandidateProfile)
class CandidateProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "phone",
        "github",
        "linkedin",
        "created_at",
    )

    search_fields = (
        "user__username",
        "phone",
    )


@admin.register(RecruiterProfile)
class RecruiterProfileAdmin(admin.ModelAdmin):
    list_display = (
        "company_name",
        "user",
        "website",
        "company_size",
        "created_at",
    )

    search_fields = (
        "company_name",
        "user__username",
    )