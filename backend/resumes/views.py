from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from cloudinary.uploader import upload

from .models import Resume
from .serializers import ResumeSerializer
from .utils import extract_pdf_text

from accounts.permissions import IsCandidate


from ai_engine.models import ResumeAnalysis




class UploadResumeView(APIView):
    permission_classes = [IsAuthenticated, IsCandidate]

    def post(self, request):

        try:
            pdf_file = request.FILES.get("resume")

            if pdf_file is None:
                return Response(
                    {"error": "Resume file is required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            print("STEP 1 : File received")

            extracted_text = extract_pdf_text(pdf_file)

            print("STEP 2 : PDF extracted")

            pdf_file.seek(0)

            cloudinary_response = upload(
                pdf_file,
                resource_type="raw",
                folder="resumes"
            )

            print("STEP 3 : Uploaded to Cloudinary")

            resume_url = cloudinary_response["secure_url"]

            resume, created = Resume.objects.update_or_create(
                candidate=request.user,
                defaults={
                    "resume_url": resume_url,
                    "extracted_text": extracted_text,
                },
            )

            print("STEP 4 : Resume saved")

            ResumeAnalysis.objects.filter(
                resume=resume
            ).delete()

            print("STEP 5 : Old analysis deleted")

            serializer = ResumeSerializer(resume)

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            import traceback

            traceback.print_exc()

            return Response(
                {
                    "error": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



        
       
class ResumeDetailView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate
    ]

    def get(self, request):

        print("=" * 50)
        print("USER ID:", request.user.id)
        print("USERNAME:", request.user.username)
        print("ROLE:", getattr(request.user, "role", None))
        print("=" * 50)

        try:

            resume = Resume.objects.get(
                candidate=request.user
            )

            print("FOUND RESUME:", resume.id)

            serializer = ResumeSerializer(resume)

            return Response(
                serializer.data
            )

        except Resume.DoesNotExist:

            print("NO RESUME FOUND FOR USER")

            return Response(
                {
                    "error": "Resume not uploaded",
                    "user_id": request.user.id,
                    "username": request.user.username
                },
                status=404
            )


class DeleteResumeView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def delete(self, request):

        try:

            resume = Resume.objects.get(
                candidate=request.user
            )

            resume.delete()

            return Response(
                {
                    "message": "Resume deleted successfully"
                }
            )

        except Resume.DoesNotExist:

            return Response(
                {
                    "error": "Resume not found"
                },
                status=status.HTTP_404_NOT_FOUND
            )