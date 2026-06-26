from rest_framework import serializers

from .models import (
    ResumeAnalysis,
    JobMatch,
    CandidateScreening
)

from jobs.models import Job


class ResumeAnalysisSerializer(serializers.ModelSerializer):

    class Meta:
        model = ResumeAnalysis
        fields = "__all__"


class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job
        fields = [
            "id",
            "title",
            "company",
            "location",
            "job_type",
            "description",
            "skills_required"
        ]


class JobMatchSerializer(serializers.ModelSerializer):

    job = JobSerializer(read_only=True)

    class Meta:
        model = JobMatch
        fields = "__all__"


class CandidateScreeningSerializer(serializers.ModelSerializer):

    class Meta:
        model = CandidateScreening
        fields = "__all__"