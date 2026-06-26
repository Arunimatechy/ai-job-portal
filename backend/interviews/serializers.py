from rest_framework import serializers

from .models import (
    InterviewKit,
    Interview
)


class InterviewKitSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = InterviewKit
        fields = "__all__"


class InterviewSerializer(
    serializers.ModelSerializer
):

    candidate_name = serializers.CharField(
        source="application.candidate.username",
        read_only=True
    )

    job_title = serializers.CharField(
        source="application.job.title",
        read_only=True
    )

    class Meta:
        model = Interview

        fields = [
            "id",
            "application",
            "candidate_name",
            "job_title",
            "scheduled_at",
            "meeting_link",
            "notes",
            "status",
            "created_at",
        ]