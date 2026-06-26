from datetime import date

from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):

    recruiter_name = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:
        model = Job

        fields = "__all__"

        read_only_fields = [
            "created_by",
            "created_at",
            "recruiter_name",
        ]

    def validate_salary(self, value):

        if not value:
            raise serializers.ValidationError(
                "Salary required"
            )

        return value

    def validate_deadline(self, value):

        if value < date.today():

            raise serializers.ValidationError(
                "Deadline cannot be in past"
            )

        return value