import json

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from resumes.models import Resume
from jobs.models import Job
from applications.models import Application
from .models import JobMatch
from accounts.permissions import (
    IsCandidate,
    IsRecruiter
)

from .models import (
    ResumeAnalysis,
    JobMatch,
    CandidateScreening
)

from .serializers import (
    ResumeAnalysisSerializer,
    JobMatchSerializer,
    CandidateScreeningSerializer
)

from .ai_resume_analyzer import analyze_resume
from .ai_job_matcher import match_resume_to_job
from .ai_screening import screen_candidate


class AnalyzeResumeView(APIView):

    permission_classes=[
        IsAuthenticated,
        IsCandidate
    ]


    def post(self, request):

        print("===== ANALYZE START =====")


        try:

            resume = Resume.objects.get(
                candidate=request.user
            )

            print("RESUME FOUND")
            print(len(resume.extracted_text))


        except Exception as e:

            print("RESUME ERROR", e)

            return Response(
                {
                    "error":"Resume not found"
                },
                status=404
            )


        try:

            ai_result = analyze_resume(
                resume.extracted_text
            )


            print("AI RESULT")
            print(ai_result)


            data=json.loads(ai_result)


            print("JSON OK")


        except Exception as e:

            print("AI FAILED")
            print(e)

            return Response(
                {
                    "error":str(e)
                },
                status=500
            )
        analysis,created = ResumeAnalysis.objects.update_or_create(

            resume=resume,

            defaults={

                "skills": data.get("skills",[]),

                "education": data.get("education",[]),

                "experience": data.get("experience",[]),

                "resume_score": data.get("resume_score",0),

                "summary": data.get("summary","")

            }
        )


        print("SAVED")
        print(analysis.id)


        # AUTO CREATE RECOMMENDED JOBS

        jobs = Job.objects.all()


        for job in jobs:


            candidate_data = {

                "skills": analysis.skills,

                "education": analysis.education,

                "experience": analysis.experience,

                "summary": analysis.summary,

            }


            job_data = {

                "title": job.title,

                "description": job.description,

                "skills_required": job.skills_required,

            }


            try:

                ai_result = match_resume_to_job(
                    candidate_data,
                    job_data
                )


                JobMatch.objects.update_or_create(

                    resume_analysis=analysis,

                    job=job,

                    defaults={

                        "match_score":
                        ai_result.get(
                            "match_score",
                            0
                        ),

                        "missing_skills":
                        ai_result.get(
                            "missing_skills",
                            []
                        ),

                        "strengths":
                        ai_result.get(
                            "strengths",
                            []
                        ),

                        "recommendations":
                        ai_result.get(
                            "recommendations",
                            ""
                        )
                    }
                )


            except Exception as e:

                print(
                    "MATCH ERROR:",
                    e
                )



        return Response(
            ResumeAnalysisSerializer(analysis).data
        )



        
# ==========================
# My Analysis
# ==========================
# ==========================
# My Analysis
# ==========================
class MyAnalysisView(APIView):

    permission_classes=[
        IsAuthenticated,
        IsCandidate
    ]


    def get(self, request):

        try:

            resume = Resume.objects.get(
                candidate=request.user
            )


            analysis = ResumeAnalysis.objects.get(
                resume=resume
            )


            return Response(
                ResumeAnalysisSerializer(
                    analysis
                ).data
            )


        except Resume.DoesNotExist:

            return Response(
                {
                    "error":"Resume not uploaded"
                },
                status=404
            )


        except ResumeAnalysis.DoesNotExist:

            return Response(
                {
                    "resume_score":0,
                    "skills":[],
                    "education":[],
                    "experience":[],
                    "summary":""
                }
            )


# ==========================
# Match Resume With Job
# ==========================
class MatchJobView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate
    ]

    def post(self, request, job_id):

        try:

            analysis = ResumeAnalysis.objects.get(
                resume__candidate=request.user
            )

        except ResumeAnalysis.DoesNotExist:

            return Response(
                {
                    "error":
                    "Analyze resume first"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        try:

            job = Job.objects.get(
                id=job_id
            )

        except Job.DoesNotExist:

            return Response(
                {
                    "error":
                    "Job not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        candidate_data = {
            "skills": analysis.skills,
            "education": analysis.education,
            "experience": analysis.experience,
            "summary": analysis.summary,
        }

        job_data = {
            "title": job.title,
            "description": job.description,
            "skills_required": job.skills_required,
        }

        ai_result = (
            match_resume_to_job(
                candidate_data,
                job_data
            )
        )

        match, created = (
            JobMatch.objects.update_or_create(
                resume_analysis=analysis,
                job=job,
                defaults={

                    "match_score":
                    ai_result.get(
                        "match_score",
                        0
                    ),

                    "missing_skills":
                    ai_result.get(
                        "missing_skills",
                        []
                    ),

                    "strengths":
                    ai_result.get(
                        "strengths",
                        []
                    ),

                    "recommendations":
                    ai_result.get(
                        "recommendations",
                        ""
                    ),
                }
            )
        )

        serializer = JobMatchSerializer(
            match
        )

        return Response(
            serializer.data
        )


# ==========================
# My Matches
# ==========================
class MyMatchesView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate
    ]

    def get(self, request):

        try:

            analysis = ResumeAnalysis.objects.get(
                resume__candidate=request.user
            )

        except ResumeAnalysis.DoesNotExist:

            return Response(
                {
                    "error":
                    "Resume analysis required"
                },
                status=status.HTTP_404_NOT_FOUND
            )

        matches = JobMatch.objects.filter(
            resume_analysis=analysis
        ).order_by(
            "-match_score"
        )

        serializer = JobMatchSerializer(
            matches,
            many=True
        )

        return Response(
            serializer.data
        )


# ==========================
# Recruiter Candidate Ranking
# ==========================
class JobCandidateRankingView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def get(
        self,
        request,
        job_id
    ):

        matches = JobMatch.objects.filter(
            job_id=job_id,
            job__created_by=request.user
        ).order_by(
            "-match_score"
        )

        serializer = JobMatchSerializer(
            matches,
            many=True
        )

        return Response(
            serializer.data
        )


# ==========================
# Screen Candidate
# ==========================
class ScreenCandidateView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def post(
        self,
        request,
        application_id
    ):

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

        try:

            match = (
                JobMatch.objects.get(
                    job=application.job,
                    resume_analysis__resume__candidate=
                    application.candidate
                )
            )

        except JobMatch.DoesNotExist:

            return Response(
                {
                    "error":
                    "Run job matching first"
                },
                status=404
            )

        candidate_data = {

            "candidate":
            application.candidate.username,

            "match_score":
            match.match_score,

            "strengths":
            match.strengths,

            "missing_skills":
            match.missing_skills,
        }

        ai_result = (
            screen_candidate(
                candidate_data,
                match.match_score
            )
        )

        screening, created = (
            CandidateScreening.objects
            .update_or_create(

                application=application,

                defaults={

                    "screening_score":
                    ai_result["screening_score"],

                    "decision":
                    ai_result["decision"],

                    "reasons":
                    ai_result["reasons"],

                    "ai_summary":
                    ai_result["ai_summary"]
                }
            )
        )

        decision = ai_result["decision"]

        if decision == "shortlist":
            application.status = "shortlisted"

        elif decision == "reject":
            application.status = "rejected"

        else:
            application.status = "reviewed"

        application.save()

        serializer = CandidateScreeningSerializer(
            screening
        )

        return Response(
            serializer.data
        )


# ==========================
# Recruiter Screening Dashboard
# ==========================
class RecruiterScreeningDashboardView(
    APIView
):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def get(self, request):

        screenings = (
            CandidateScreening.objects
            .filter(
                application__job__created_by=
                request.user
            )
            .order_by(
                "-screening_score"
            )
        )

        serializer = (
            CandidateScreeningSerializer(
                screenings,
                many=True
            )
        )

        return Response(
            serializer.data
        )
class RecommendedJobsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate
    ]

    def get(self, request):

        print("USER:", request.user.username)

        matches = JobMatch.objects.filter(
            resume_analysis__resume__candidate=request.user
        ).order_by("-match_score")

        print("MATCH COUNT:", matches.count())

        serializer = JobMatchSerializer(
            matches,
            many=True
        )

        return Response(serializer.data)



class CandidateRankingView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def get(self, request, job_id):

        applications = (
            Application.objects
            .filter(
                job_id=job_id,
                job__created_by=request.user
            )
            .select_related(
                "candidate"
            )
        )

        data = []

        for application in applications:

            try:

                match = JobMatch.objects.get(
                    job_id=job_id,
                    resume_analysis__resume__candidate=
                    application.candidate
                )

                analysis = match.resume_analysis

                data.append({
                    "candidate":
                    application.candidate.username,

                    "score":
                    match.match_score,

                    "status":
                    application.status,

                    "skills":
                    analysis.skills,

                    "strengths":
                    match.strengths,

                    "missing_skills":
                    match.missing_skills,

                    "recommendations":
                    match.recommendations
                })

            except JobMatch.DoesNotExist:
                pass

        data = sorted(
            data,
            key=lambda x: x["score"],
            reverse=True
        )

        return Response(data)




class AIScreeningView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter
    ]

    def get(self, request):

        applications = (
            Application.objects
            .filter(
                job__created_by=request.user
            )
            .select_related(
                "candidate",
                "job"
            )
        )

        results = []

        for application in applications:

            try:

                match = JobMatch.objects.get(
                    job=application.job,
                    resume_analysis__resume__candidate=
                    application.candidate
                )

                if match.match_score >= 80:
                    decision = "Shortlist"

                elif match.match_score >= 50:
                    decision = "Review"

                else:
                    decision = "Reject"

                results.append({
                    "candidate":
                    application.candidate.username,

                    "job":
                    application.job.title,

                    "score":
                    match.match_score,

                    "decision":
                    decision,

                    "strengths":
                    match.strengths,

                    "missing_skills":
                    match.missing_skills,

                    "recommendations":
                    match.recommendations
                })

            except JobMatch.DoesNotExist:
                pass

        return Response(results)    
    