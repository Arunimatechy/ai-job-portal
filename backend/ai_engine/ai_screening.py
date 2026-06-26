import json

from openai import OpenAI
from django.conf import settings


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)


def screen_candidate(
    candidate_data,
    match_data
):

    prompt = f"""
    Analyze candidate.

    Return JSON only.

    {{
      "screening_score": 0,
      "decision": "",
      "reasons": [],
      "ai_summary": ""
    }}

    Candidate:

    {candidate_data}

    Match Data:

    {match_data}

    Rules:

    Score >= 80:
    shortlist

    Score 60-79:
    review

    Score < 60:
    reject
    """

    response = client.chat.completions.create(
        model="openai/gpt-4o-mini",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return json.loads(
        response.choices[0].message.content
    )