from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.permissions import (
    IsCandidate,
    IsRecruiter,
)

from .models import Application
from .serializers import ApplicationSerializer

from jobs.models import Job

# ✅ ADD THIS IMPORT
from notifications.utils import create_notification


# ==========================================
# Apply Job (Candidate Only)
# ==========================================
class ApplyJobView(generics.CreateAPIView):

    serializer_class = ApplicationSerializer
    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def create(self, request, *args, **kwargs):

        job_id = request.data.get("job")

        if not job_id:
            return Response(
                {"error": "Job ID is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            job = Job.objects.get(id=job_id)

        except Job.DoesNotExist:
            return Response(
                {"error": "Job not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Prevent applying to own job
        if job.created_by == request.user:
            return Response(
                {"error": "Cannot apply to your own job"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        # Prevent duplicate applications
        if Application.objects.filter(
            candidate=request.user,
            job=job,
        ).exists():

            return Response(
                {"error": "Already applied"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        application = serializer.save(
            candidate=request.user
        )

        # ✅ NOTIFICATION (Recruiter)
        create_notification(
            user=job.created_by,
            title="New Application Received",
            message=f"{request.user.username} applied for {job.title}"
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


# ==========================================
# Candidate Application History
# ==========================================
class MyApplicationsView(generics.ListAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def get_queryset(self):

        return (
            Application.objects
            .select_related(
                "job",
                "candidate"
            )
            .filter(
                candidate=self.request.user
            )
            .order_by("-applied_at")
        )


# ==========================================
# Recruiter View Applicants
# ==========================================
class JobApplicantsView(generics.ListAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def get_queryset(self):

        job_id = self.kwargs["job_id"]

        return (
            Application.objects
            .select_related(
                "candidate",
                "job"
            )
            .filter(
                job_id=job_id,
                job__created_by=self.request.user
            )
            .order_by("-applied_at")
        )


# ==========================================
# Update Application Status
# ==========================================
class UpdateApplicationStatusView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def patch(self, request, pk):

        try:
            application = (
                Application.objects
                .select_related(
                    "candidate",
                    "job"
                )
                .get(
                    id=pk,
                    job__created_by=request.user
                )
            )

        except Application.DoesNotExist:

            return Response(
                {"error": "Application not found"},
                status=status.HTTP_404_NOT_FOUND,
            )

        status_value = request.data.get("status")

        allowed_status = [
            choice[0]
            for choice in Application.STATUS_CHOICES
        ]

        if status_value not in allowed_status:

            return Response(
                {"error": "Invalid status"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        application.status = status_value
        application.save()

        # ✅ NOTIFICATION (Candidate)
        create_notification(
            user=application.candidate,
            title="Application Update",
            message=f"Your application for {application.job.title} is {status_value}"
        )

        return Response(
            {
                "message": "Status updated successfully",
                "application_id": application.id,
                "candidate": application.candidate.username,
                "job": application.job.title,
                "status": application.status,
            }
        )