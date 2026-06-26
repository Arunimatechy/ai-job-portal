from django.urls import path

from .views import RecruiterAnalyticsView

urlpatterns = [
    path(
        "recruiter/",
        RecruiterAnalyticsView.as_view()
    ),
]