from rest_framework import generics, filters
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from django_filters.rest_framework import DjangoFilterBackend

from .models import Job
from .serializers import JobSerializer

from applications.models import Application
from accounts.permissions import IsRecruiter, IsCandidate


# ==========================================
# Create Job
# ==========================================
class JobCreateView(generics.CreateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


# ==========================================
# List Jobs
# ==========================================
class JobListView(generics.ListAPIView):
    queryset = (
        Job.objects
        .select_related("created_by")
        .all()
        .order_by("-created_at")
    )

    serializer_class = JobSerializer
    permission_classes = [AllowAny]

    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]

    filterset_fields = [
        "location",
        "job_type",
    ]

    search_fields = [
        "title",
        "company",
        "skills_required",
    ]

    ordering_fields = [
        "created_at",
        "deadline",
    ]


# ==========================================
# Job Detail
# ==========================================
class JobDetailView(generics.RetrieveAPIView):
    queryset = (
        Job.objects
        .select_related("created_by")
        .all()
    )

    serializer_class = JobSerializer
    permission_classes = [AllowAny]


# ==========================================
# Recruiter Jobs
# ==========================================
class RecruiterJobsView(generics.ListAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def get_queryset(self):
        return (
            Job.objects
            .filter(created_by=self.request.user)
            .order_by("-created_at")
        )


# ==========================================
# Recruiter Dashboard
# ==========================================
class RecruiterDashboardView(APIView):
    permission_classes = [IsRecruiter]

    def get(self, request):

        jobs = Job.objects.filter(
            created_by=request.user
        )

        total_jobs = jobs.count()

        total_applications = (
            Application.objects.filter(
                job__created_by=request.user
            ).count()
        )

        shortlisted = (
            Application.objects.filter(
                job__created_by=request.user,
                status="shortlisted"
            ).count()
        )

        rejected = (
            Application.objects.filter(
                job__created_by=request.user,
                status="rejected"
            ).count()
        )

        pending = (
            Application.objects.filter(
                job__created_by=request.user,
                status="pending"
            ).count()
        )

        recent_applications = (
            Application.objects.filter(
                job__created_by=request.user
            )
            .select_related("candidate", "job")
            .order_by("-applied_at")[:5]
        )

        return Response({
            "total_jobs": total_jobs,
            "total_applications": total_applications,
            "shortlisted": shortlisted,
            "rejected": rejected,
            "pending": pending,

            "recent_applications": [
                {
                    "id": app.id,
                    "candidate": app.candidate.username,
                    "job": app.job.title,
                    "status": app.status,
                    "date": app.applied_at,
                }
                for app in recent_applications
            ]
        })


# ==========================================
# Candidate Dashboard
# ==========================================
class CandidateDashboardView(APIView):
    permission_classes = [IsCandidate]

    def get(self, request):

        applications = Application.objects.filter(
            candidate=request.user
        )

        total_applications = applications.count()

        recent_applications = applications.order_by(
            "-applied_at"
        )[:5]

        return Response({
            "total_applications": total_applications,
            "resume_score": 0,
            "recommended_jobs": 0,

            "recent_applications": [
                {
                    "id": app.id,
                    "job": app.job.title,
                    "status": app.status,
                    "date": app.applied_at,
                }
                for app in recent_applications
            ]
        })


# ==========================================
# Update Job
# ==========================================
class JobUpdateView(generics.UpdateAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def get_queryset(self):
        return Job.objects.filter(
            created_by=self.request.user
        )


# ==========================================
# Delete Job
# ==========================================
class JobDeleteView(generics.DestroyAPIView):
    serializer_class = JobSerializer
    permission_classes = [IsRecruiter]

    def get_queryset(self):
        return Job.objects.filter(
            created_by=self.request.user
        )