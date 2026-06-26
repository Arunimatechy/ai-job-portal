
from django.contrib import admin
from .models import ResumeAnalysis, CandidateScreening, JobMatch


@admin.register(ResumeAnalysis)
class ResumeAnalysisAdmin(admin.ModelAdmin):
    list_display = (
        "resume",
        "resume_score",
        "analyzed_at",
    )
    search_fields = (
        "resume__candidate__username",
    )


@admin.register(CandidateScreening)
class CandidateScreeningAdmin(admin.ModelAdmin):
    list_display = (
        "application",
        "screening_score",
        "decision",
        "screened_at",
    )
    list_filter = (
        "decision",
    )


@admin.register(JobMatch)
class JobMatchAdmin(admin.ModelAdmin):
    list_display = (
        "resume_analysis",
        "job",
        "match_score",
        "created_at",
    )
    search_fields = (
        "job__title",
        "resume_analysis__resume__candidate__username",
    )