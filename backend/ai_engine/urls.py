from django.urls import path

from .views import (
    AnalyzeResumeView,
    MyAnalysisView,
    MatchJobView,
    MyMatchesView,
    JobCandidateRankingView,
    ScreenCandidateView,
    RecruiterScreeningDashboardView,
    RecommendedJobsView,  
     CandidateRankingView,
     AIScreeningView,
     
       # add
)


urlpatterns = [

    path(
        "analyze/",
        AnalyzeResumeView.as_view()
    ),

    path(
        "ranking/<int:job_id>/",
        CandidateRankingView.as_view()
    ),

    path(
        "my-analysis/",
        MyAnalysisView.as_view()
    ),


    path(
        "match/<int:job_id>/",
        MatchJobView.as_view()
    ),


    path(
        "matches/",
        MyMatchesView.as_view()
    ),


    path(
        "ranking/<int:job_id>/",
        JobCandidateRankingView.as_view()
    ),


    path(
        "screen/<int:application_id>/",
        ScreenCandidateView.as_view()
    ),


    path(
        "screenings/",
        RecruiterScreeningDashboardView.as_view()
    ),
path(
    "screening/",
    AIScreeningView.as_view()
),

    # AI Recommended Jobs
    path(
        "recommendations/",
        RecommendedJobsView.as_view()
    ),

]