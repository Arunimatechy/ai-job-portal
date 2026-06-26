import json

from openai import OpenAI
from django.conf import settings


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)


def evaluate_answer(
    question,
    answer
):

    prompt = f"""
Evaluate this interview answer.

Question:
{question}

Answer:
{answer}

Return JSON only:

{{
  "score": 8,
  "feedback": "Good answer"
}}
"""

    response = (
        client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )
    )

    return json.loads(
        response.choices[0]
        .message.content
    )