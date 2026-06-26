from rest_framework import serializers
from .models import Application


class ApplicationSerializer(
    serializers.ModelSerializer
):

    candidate_name = serializers.CharField(
        source="candidate.username",
        read_only=True
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True
    )

    company = serializers.CharField(
        source="job.company",
        read_only=True
    )

    location = serializers.CharField(
        source="job.location",
        read_only=True
    )

    class Meta:
        model = Application

        fields = [
            "id",
            "candidate",
            "candidate_name",
            "job",
            "job_title",
            "company",
            "location",
            "status",
            "cover_letter",
            "applied_at",
        ]

        read_only_fields = [
            "candidate",
            "candidate_name",
            "job_title",
            "company",
            "location",
            "status",
            "applied_at",
        ]