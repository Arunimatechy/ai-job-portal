from rest_framework import serializers
from .models import CandidateProfile, RecruiterProfile


class CandidateProfileSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = CandidateProfile
        fields = "__all__"
        read_only_fields = ["user"]

    def validate_phone(self, value):

        if not value.isdigit():
            raise serializers.ValidationError(
                "Phone number must contain only digits."
            )

        if len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be exactly 10 digits."
            )

        return value


class RecruiterProfileSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = RecruiterProfile
        fields = "__all__"
        read_only_fields = ["user"]