from django.urls import path

from .views import (
    JobCreateView,
    JobListView,
    JobDetailView,
    JobUpdateView,
    JobDeleteView,
    RecruiterJobsView,
    RecruiterDashboardView,
    CandidateDashboardView,
)

urlpatterns = [

    path(
        "",
        JobListView.as_view(),
        name="job-list"
    ),

    path(
        "create/",
        JobCreateView.as_view(),
        name="job-create"
    ),

    path(
        "my-jobs/",
        RecruiterJobsView.as_view(),
        name="my-jobs"
    ),

    path(
        "dashboard/",
        RecruiterDashboardView.as_view(),
        name="recruiter-dashboard"
    ),

    path(
        "candidate-dashboard/",
        CandidateDashboardView.as_view(),
        name="candidate-dashboard"
    ),

    path(
        "<int:pk>/",
        JobDetailView.as_view(),
        name="job-detail"
    ),

    path(
        "update/<int:pk>/",
        JobUpdateView.as_view(),
        name="job-update"
    ),

    path(
        "delete/<int:pk>/",
        JobDeleteView.as_view(),
        name="job-delete"
    ),
]