from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from accounts.permissions import IsRecruiter

from jobs.models import Job
from applications.models import Application


class RecruiterAnalyticsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def get(self, request):

        # ==========================
        # Jobs
        # ==========================
        jobs = Job.objects.filter(
            created_by=request.user
        )

        total_jobs = jobs.count()

        active_jobs = jobs.count()

        # ==========================
        # Applications
        # ==========================
        applications = Application.objects.filter(
            job__created_by=request.user
        )

        total_applications = applications.count()

        # ==========================
        # Status Counts
        # ==========================
        shortlisted = applications.filter(
            status="shortlisted"
        ).count()

        rejected = applications.filter(
            status="rejected"
        ).count()

        pending = applications.filter(
            status="pending"
        ).count()

        reviewed = applications.filter(
            status="reviewed"
        ).count()

        # ==========================
        # Conversion Rate
        # ==========================
        conversion_rate = 0

        if total_applications > 0:

            conversion_rate = round(
                (
                    shortlisted /
                    total_applications
                ) * 100,
                2
            )

        # ==========================
        # AI Insight
        # ==========================
        if conversion_rate > 50:

            insight = (
                "Strong hiring pipeline"
            )

        elif conversion_rate > 20:

            insight = (
                "Moderate candidate quality"
            )

        else:

            insight = (
                "Low match quality — improve job descriptions"
            )

        # ==========================
        # Job Performance
        # ==========================
        job_stats = []

        for job in jobs:

            apps = Application.objects.filter(
                job=job
            )

            job_stats.append({

                "job_title":
                job.title,

                "applications":
                apps.count(),

                "shortlisted":
                apps.filter(
                    status="shortlisted"
                ).count(),

                "rejected":
                apps.filter(
                    status="rejected"
                ).count(),
            })

        # ==========================
        # Average Applications
        # ==========================
        average_applications = 0

        if total_jobs > 0:

            average_applications = round(
                total_applications /
                total_jobs,
                2
            )

        # ==========================
        # Top Performing Job
        # ==========================
        top_job = "No Jobs"

        if job_stats:

            top_job = max(
                job_stats,
                key=lambda x:
                x["applications"]
            )["job_title"]

        # ==========================
        # Recent Applications
        # ==========================
        recent_applications = []

        latest_apps = applications.order_by(
            "-applied_at"
        )[:5]

        for app in latest_apps:

            recent_applications.append({

                "candidate":
                app.candidate.username,

                "job":
                app.job.title,

                "status":
                app.status,

                "applied_at":
                app.applied_at.strftime(
                    "%d-%m-%Y"
                )
            })

        # ==========================
        # Response
        # ==========================
        return Response({

            "total_jobs":
            total_jobs,

            "active_jobs":
            active_jobs,

            "total_applications":
            total_applications,

            "shortlisted":
            shortlisted,

            "rejected":
            rejected,

            "pending":
            pending,

            "reviewed":
            reviewed,

            "conversion_rate":
            conversion_rate,

            "insight":
            insight,

            "average_applications":
            average_applications,

            "top_job":
            top_job,

            "recent_applications":
            recent_applications,

            "job_stats":
            job_stats
        })