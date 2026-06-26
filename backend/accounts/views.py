from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenSerializer
from .models import (
    User,
    CandidateProfile,
    RecruiterProfile,
)

from .serializers import RegisterSerializer

from .profile_serializers import (
    CandidateProfileSerializer,
    RecruiterProfileSerializer,
)

from .permissions import (
    IsCandidate,
    IsRecruiter,
)


# ==========================================
# Register User
# ==========================================
class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer


# ==========================================
# Logged In User Profile
# ==========================================
class ProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        return Response(
            {
                "id": request.user.id,
                "username": request.user.username,
                "email": request.user.email,
                "role": request.user.role,
                "date_joined": request.user.date_joined,
            }
        )


# ==========================================
# Candidate Profile
# ==========================================
class CandidateProfileView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def get(self, request):

        try:

            profile = (
    CandidateProfile.objects
    .select_related("user")
    .get(user=request.user)
)

            serializer = CandidateProfileSerializer(
                profile
            )

            return Response(serializer.data)

        except CandidateProfile.DoesNotExist:

            return Response(
                {
                    "error":
                    "Candidate profile not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request):

        if CandidateProfile.objects.filter(
            user=request.user
        ).exists():

            return Response(
                {
                    "error":
                    "Profile already exists"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = CandidateProfileSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save(
            user=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )


# ==========================================
# Recruiter Profile
# ==========================================
class RecruiterProfileView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def get(self, request):

        try:

            profile = (
    RecruiterProfile.objects
    .select_related("user")
    .get(user=request.user)
)

            serializer = RecruiterProfileSerializer(
                profile
            )

            return Response(
                serializer.data
            )

        except RecruiterProfile.DoesNotExist:

            return Response(
                {
                    "error":
                    "Recruiter profile not found"
                },
                status=status.HTTP_404_NOT_FOUND,
            )

    def post(self, request):

        if RecruiterProfile.objects.filter(
            user=request.user
        ).exists():

            return Response(
                {
                    "error":
                    "Profile already exists"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = RecruiterProfileSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        serializer.save(
            user=request.user
        )

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED,
        )
class MyTokenView(TokenObtainPairView):

    serializer_class = MyTokenSerializer    