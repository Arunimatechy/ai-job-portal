
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from jobs.models import Job

from .models import MockInterview

from .serializers import (
    MockInterviewSerializer
)

from .ai_mock_interview import (
    evaluate_answer
)


class EvaluateAnswerView(APIView):

    permission_classes = [
        IsAuthenticated
    ]

    def post(self, request):

        question = request.data.get(
            "question"
        )

        answer = request.data.get(
            "answer"
        )

        job_id = request.data.get(
            "job"
        )

        try:

            job = Job.objects.get(
                id=job_id
            )

        except Job.DoesNotExist:

            return Response(
                {
                    "error":
                    "Job not found"
                },
                status=404
            )

        result = evaluate_answer(
            question,
            answer
        )

        interview = (
            MockInterview.objects.create(
                candidate=request.user,
                job=job,
                question=question,
                answer=answer,
                score=result.get(
                    "score",
                    0
                ),
                feedback=result.get(
                    "feedback",
                    ""
                )
            )
        )

        serializer =MockInterviewSerializer(
            interview
        )

        return Response(
            serializer.data
        )