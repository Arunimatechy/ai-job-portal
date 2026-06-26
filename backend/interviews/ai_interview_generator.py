from openai import OpenAI
from django.conf import settings


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)


def generate_interview_questions(job_data):
    """
    Generate interview questions from job details.
    Returns JSON string from AI.
    """

    prompt = f"""
    Generate interview questions for this job.

    Return ONLY valid JSON in this format:

    {{
        "technical_questions": [],
        "behavioral_questions": [],
        "role_based_questions": [],
        "difficulty": "easy",
        "summary": ""
    }}

    Job Details:

    {job_data}

    Rules:
    - Generate 5 technical questions
    - Generate 5 behavioral questions
    - Generate 5 role-based questions
    - Set difficulty as easy, medium, or hard
    - Return JSON only
    - Do not include markdown
    """

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
    )

    return response.choices[0].message.content