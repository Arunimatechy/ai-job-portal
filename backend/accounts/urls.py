from django.urls import path

from .views import (
    RegisterView,
    ProfileView,
    CandidateProfileView,
    RecruiterProfileView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),

    path("profile/", ProfileView.as_view(), name="profile"),

    path(
        "candidate-profile/",
        CandidateProfileView.as_view(),
        name="candidate-profile"
    ),

    path(
        "recruiter-profile/",
        RecruiterProfileView.as_view(),
        name="recruiter-profile"
    ),
]