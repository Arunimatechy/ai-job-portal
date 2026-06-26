from django.urls import path

from .views import (
    GenerateInterviewKitView,
    InterviewKitDetailView,
    ScheduleInterviewView,
    MyInterviewsView,
     ShortlistedApplicantsView,
)

urlpatterns = [

    path(
        "generate/<int:job_id>/",
        GenerateInterviewKitView.as_view()
    ),
    path(
    "shortlisted-applicants/",
    ShortlistedApplicantsView.as_view()
),
    path(
        "detail/<int:job_id>/",
        InterviewKitDetailView.as_view()
    ),

    path(
        "schedule/",
        ScheduleInterviewView.as_view()
    ),

    path(
        "my-interviews/",
        MyInterviewsView.as_view()
    ),
]