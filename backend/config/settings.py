


from pathlib import Path
import os
import cloudinary
import dj_database_url
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


# ========================
# SECURITY
# ========================
SECRET_KEY = os.getenv("SECRET_KEY", "django-insecure-default-key-change-me")

DEBUG = os.getenv("DEBUG", "False") == "True"

ALLOWED_HOSTS = [
    "localhost",
    "127.0.0.1",
    ".onrender.com",
    "ai-job-portal-ww2o.onrender.com",
]
# ========================
# APPS
# ========================
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "whitenoise.runserver_nostatic",

    "rest_framework",
    "corsheaders",
    "django_filters",
    "drf_yasg",

    "accounts",
    "jobs",
    "applications",
    "resumes",
    "ai_engine",
    "notifications",
    "interviews",
    "analytics",
    "offer_letters",
    "mock_interview",


    "core",   # ✅ IMPORTANT FIX
]


cloudinary.config(
    cloud_name=os.getenv(
        "CLOUDINARY_CLOUD_NAME"
    ),
    api_key=os.getenv(
        "CLOUDINARY_API_KEY"
    ),
    api_secret=os.getenv(
        "CLOUDINARY_API_SECRET"
    ),
)
# ========================
# MIDDLEWARE
# ========================

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "corsheaders.middleware.CorsMiddleware",

    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "config.urls"


# ========================
# TEMPLATES
# ========================
OPENROUTER_API_KEY = os.getenv(
    "OPENROUTER_API_KEY"
)


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


WSGI_APPLICATION = "config.wsgi.application"


# ========================
# DATABASE
# ========================

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR}/db.sqlite3",
        conn_max_age=600
    )
}


# ========================
# AUTH
# ========================
AUTH_USER_MODEL = "accounts.User"


# ========================
# DRF
# ========================
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),

    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
        "rest_framework.filters.SearchFilter",
        "rest_framework.filters.OrderingFilter",
    ],

    "DEFAULT_PAGINATION_CLASS":
        "rest_framework.pagination.PageNumberPagination",

    "PAGE_SIZE": 10,

    "EXCEPTION_HANDLER":
        "core.exceptions.custom_exception_handler",
}


# ========================
# CORS
# ========================
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
   
]

CSRF_TRUSTED_ORIGINS = [
 "https://ai-job-portal-ww2o.onrender.com",
    

]
# ========================
# STATIC
# ========================

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_STORAGE = (
    "whitenoise.storage.CompressedManifestStaticFilesStorage"
)

MEDIA_URL = "/media/"
MEDIA_ROOT = BASE_DIR / "media"
# ========================
# DEFAULT PK
# ========================
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"