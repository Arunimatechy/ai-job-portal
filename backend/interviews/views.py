import json

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from accounts.permissions import IsRecruiter

from jobs.models import Job

from .models import (
    InterviewKit,
    Interview
)
from .serializers import (
    InterviewKitSerializer,
    InterviewSerializer
)
from applications.models import Application

from .ai_interview_generator import (
    generate_interview_questions
)
class GenerateInterviewKitView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def post(self, request, job_id):

        try:

            job = Job.objects.get(
                id=job_id,
                created_by=request.user
            )

        except Job.DoesNotExist:

            return Response(
                {
                    "error": "Job not found"
                },
                status=404
            )

        job_data = {
            "title": job.title,
            "company": job.company,
            "description": job.description,
            "skills_required": job.skills_required,
            "job_type": job.job_type,
        }

        try:

            ai_result = generate_interview_questions(
                job_data
            )

            parsed = json.loads(
                ai_result
            )

        except Exception as e:

            return Response(
                {
                    "error": str(e)
                },
                status=500
            )

        kit, created = (
            InterviewKit.objects.update_or_create(
                job=job,
                defaults={
                    "technical_questions":
                    parsed.get(
                        "technical_questions",
                        []
                    ),

                    "behavioral_questions":
                    parsed.get(
                        "behavioral_questions",
                        []
                    ),

                    "role_based_questions":
                    parsed.get(
                        "role_based_questions",
                        []
                    ),

                    "difficulty":
                    parsed.get(
                        "difficulty",
                        "medium"
                    ),

                    "summary":
                    parsed.get(
                        "summary",
                        ""
                    ),
                }
            )
        )

        serializer = InterviewKitSerializer(
            kit
        )

        return Response(
            serializer.data
        )
class InterviewKitDetailView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, job_id):

        try:

            kit = InterviewKit.objects.get(
                job_id=job_id
            )

        except InterviewKit.DoesNotExist:

            return Response(
                {
                    "error":
                    "Interview kit not found"
                },
                status=404
            )

        serializer = InterviewKitSerializer(
            kit
        )

        return Response(
            serializer.data
        )
    
class ScheduleInterviewView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def post(self, request):

        application_id = request.data.get(
            "application"
        )

        try:

            application = (
                Application.objects
                .select_related(
                    "candidate",
                    "job"
                )
                .get(
                    id=application_id,
                    job__created_by=request.user
                )
            )

        except Application.DoesNotExist:

            return Response(
                {
                    "error":
                    "Application not found"
                },
                status=404
            )

        interview, created = (
            Interview.objects.update_or_create(
                application=application,
                defaults={
                    "scheduled_at":
                    request.data.get(
                        "scheduled_at"
                    ),

                    "meeting_link":
                    request.data.get(
                        "meeting_link",
                        ""
                    ),

                    "notes":
                    request.data.get(
                        "notes",
                        ""
                    ),

                    "status":
                    "scheduled"
                }
            )
        )

        serializer = InterviewSerializer(
            interview
        )

        return Response(
            serializer.data
        )
class MyInterviewsView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        interviews = (
            Interview.objects
            .select_related(
                "application",
                "application__job"
            )
            .filter(
                application__candidate=
                request.user
            )
            .order_by(
                "-scheduled_at"
            )
        )

        serializer =InterviewSerializer(
            interviews,
            many=True
        )

        return Response(
            serializer.data
        )  

class ShortlistedApplicantsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def get(self, request):

        applicants = (
            Application.objects
            .select_related(
                "candidate",
                "job"
            )
            .filter(
                job__created_by=request.user,
                status="shortlisted"
            )
        )

        data = []

        for app in applicants:

            data.append({
                "id": app.id,
                "candidate": app.candidate.username,
                "job": app.job.title
            })

        return Response(data)      