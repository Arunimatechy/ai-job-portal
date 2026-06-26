from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from applications.models import Application

from .models import OfferLetter
from .serializers import OfferLetterSerializer

from .ai_offer_generator import (
    generate_offer_letter
)


class GenerateOfferLetterView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(
        self,
        request,
        application_id
    ):

        try:

            application = (
                Application.objects
                .select_related(
                    "candidate",
                    "job"
                )
                .get(id=application_id)
            )

        except Application.DoesNotExist:

            return Response(
                {
                    "error": "Application not found"
                },
                status=404
            )

        salary = request.data.get(
            "salary",
            "Not Specified"
        )

        data = {

            "candidate":
            application.candidate.username,

            "job_title":
            application.job.title,

            "company":
            application.job.company,

            "salary":
            salary,
        }

        content = generate_offer_letter(
            data
        )

        offer, created = (
            OfferLetter.objects
            .update_or_create(

                application=application,

                defaults={
                    "salary": salary,
                    "content": content
                }
            )
        )

        serializer = (
            OfferLetterSerializer(
                offer
            )
        )

        return Response(
            serializer.data
        )
class OfferLetterDetailView(
    APIView
):

    permission_classes = [
        IsAuthenticated
    ]

    def get(
        self,
        request,
        application_id
    ):

        try:

            offer =OfferLetter.objects.get(
                    application_id=
                    application_id
                )

        except OfferLetter.DoesNotExist:

            return Response(
                {
                    "error":
                    "Offer letter not found"
                },
                status=404
            )

        serializer = OfferLetterSerializer(
                offer
            )

        return Response(
            serializer.data
        )    