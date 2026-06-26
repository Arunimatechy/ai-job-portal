from django.urls import path

from .views import (
    UploadResumeView,
    ResumeDetailView,
    DeleteResumeView
)

urlpatterns = [

    path(
        "upload/",
        UploadResumeView.as_view()
    ),

    path(
        "me/",
        ResumeDetailView.as_view()
    ),
    path(
    "delete/",
    DeleteResumeView.as_view()
),

]