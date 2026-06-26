import json

from openai import OpenAI
from django.conf import settings


client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY
)



def analyze_resume(resume_text):


    prompt = f"""

Analyze this resume.

Return ONLY valid JSON.

No markdown.
No explanation.

Format:

{{
"skills":[],
"education":[],
"experience":[],
"resume_score":0,
"summary":""
}}


Resume:

{resume_text}

"""


    response = client.chat.completions.create(

        model="openai/gpt-4o-mini",

        messages=[
            {
                "role":"user",
                "content":prompt
            }
        ],

        temperature=0
    )


    result = response.choices[0].message.content


    print("========= RAW AI =========")
    print(result)



    result = result.replace(
        "```json",
        ""
    )

    result = result.replace(
        "```",
        ""
    )


    return result.strip()