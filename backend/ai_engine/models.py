from django.db import models

from resumes.models import Resume
from applications.models import Application

from jobs.models import Job
class ResumeAnalysis(models.Model):

    resume = models.OneToOneField(
        Resume,
        on_delete=models.CASCADE,
        related_name="analysis"
    )

    skills = models.JSONField(
        default=list
    )

    education = models.JSONField(
        default=list
    )

    experience = models.JSONField(
        default=list
    )

    resume_score = models.IntegerField(
        default=0
    )

    summary = models.TextField()

    analyzed_at = models.DateTimeField(
        auto_now=True
    )

    def __str__(self):
        return self.resume.candidate.username




class CandidateScreening(models.Model):

    application = models.OneToOneField(
        Application,
        on_delete=models.CASCADE,
        related_name="screening"
    )

    screening_score = models.IntegerField()

    decision = models.CharField(
        max_length=20
    )

    reasons = models.JSONField(
        default=list
    )

    ai_summary = models.TextField()

    screened_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return (
            self.application.candidate.username
        )


class JobMatch(models.Model):

    resume_analysis = models.ForeignKey(
        ResumeAnalysis,
        on_delete=models.CASCADE,
        related_name="job_matches"
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    match_score = models.IntegerField()

    missing_skills = models.JSONField(
        default=list
    )

    strengths = models.JSONField(
        default=list
    )

    recommendations = models.TextField()

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        unique_together = (
            "resume_analysis",
            "job"
        )

    def __str__(self):
        return (
            f"{self.resume_analysis.resume.candidate.username}"
            f" - {self.job.title}"
        )    