from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

from accounts.views import MyTokenView

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


# ==========================
# Swagger Schema
# ==========================
schema_view = get_schema_view(
    openapi.Info(
        title="AI Job Portal API",
        default_version="v1",
        description="API Documentation for Job Portal Project",
    ),
    public=True,
    permission_classes=[permissions.AllowAny],
)


# ==========================
# URL Patterns
# ==========================
urlpatterns = [

    path("admin/", admin.site.urls),

    path("api/auth/", include("accounts.urls")),

    path("api/jobs/", include("jobs.urls")),

    path("api/applications/", include("applications.urls")),
path(
    "api/mock-interview/",
    include(
        "mock_interview.urls"
    )
),
    path(
        "api/resumes/",
        include("resumes.urls")
    ),
path(
    "api/analytics/",
    include("analytics.urls")
),
path(
    "api/notifications/",
    include("notifications.urls")
),

path(
    "api/offer-letters/",
    include(
        "offer_letters.urls"
    )
),
    path(
        "api/ai/",
        include("ai_engine.urls")
    ),

    path(
        "api/interviews/",
        include("interviews.urls")
    ),

    path(
    "api/token/",
    MyTokenView.as_view()
),

    path(
        "api/token/refresh/",
        TokenRefreshView.as_view()
    ),

    path(
        "swagger/",
        schema_view.with_ui(
            "swagger",
            cache_timeout=0
        ),
        name="swagger-ui"
    ),
]