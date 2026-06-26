import json

from openai import OpenAI
from django.conf import settings


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY
)


def match_resume_to_job(resume_data, job_data):

    prompt = f"""
You are an expert technical recruiter.

Compare the candidate profile with the job requirements.

Rules:
- React.js and React are the same skill.
- Django REST Framework and DRF are the same skill.
- REST API and REST APIs are the same skill.
- PostgreSQL and Postgres are the same skill.

Scoring:
90-100 = Excellent Match
70-89 = Good Match
50-69 = Partial Match
0-49 = Poor Match

Return ONLY valid JSON.

Example:

{{
    "match_score": 85,
    "missing_skills": ["Docker"],
    "strengths": ["Python", "Django", "React"],
    "recommendations": "Strong candidate for this role."
}}

Candidate:

{resume_data}

Job:

{job_data}
"""

    try:

        response = client.chat.completions.create(
            model="openai/gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        )

        content = response.choices[0].message.content

        print("\n========== AI MATCH RESPONSE ==========")
        print(repr(content))
        print("=======================================\n")

        if not content:
            raise Exception("Empty response from AI")

        content = content.strip()

        # Remove markdown code blocks if AI returns them
        if content.startswith("```json"):
            content = content.replace("```json", "")
            content = content.replace("```", "")
            content = content.strip()

        result = json.loads(content)

        return {
            "match_score": result.get("match_score", 0),
            "missing_skills": result.get("missing_skills", []),
            "strengths": result.get("strengths", []),
            "recommendations": result.get("recommendations", "")
        }

    except Exception as e:

        print("\n========== MATCH ERROR ==========")
        print(str(e))
        print("=================================\n")

        return {
            "match_score": 0,
            "missing_skills": [],
            "strengths": [],
            "recommendations": f"AI Error: {str(e)}"
        }