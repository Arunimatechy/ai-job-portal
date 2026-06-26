from django.urls import path

from .views import (
    ApplyJobView,
    MyApplicationsView,
    JobApplicantsView,
    UpdateApplicationStatusView,
)

urlpatterns = [

    # Candidate
    path(
        "apply/",
        ApplyJobView.as_view(),
        name="apply-job"
    ),

    path(
        "my-applications/",
        MyApplicationsView.as_view(),
        name="my-applications"
    ),

    # Recruiter
    path(
        "job/<int:job_id>/",
        JobApplicantsView.as_view(),
        name="job-applicants"
    ),

    path(
        "<int:pk>/status/",
        UpdateApplicationStatusView.as_view(),
        name="update-status"
    ),

]