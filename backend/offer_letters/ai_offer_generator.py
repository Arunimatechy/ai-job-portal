from openai import OpenAI
from django.conf import settings

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=settings.OPENROUTER_API_KEY,
)

def generate_offer_letter(data):

    prompt = f"""
You are an HR Manager.

Generate a professional job offer letter.

Candidate Name: {data['candidate']}
Position: {data['job_title']}
Company: {data['company']}
Annual Salary: {data['salary']}

Requirements:

1. Include today's date.
2. Address the candidate professionally.
3. Congratulate them on being selected.
4. Mention job title and company name.
5. Mention salary package.
6. Mention expected joining date.
7. Include employee benefits:
   - Health Insurance
   - Paid Leave
   - Performance Bonus
   - Learning & Development
8. Professional closing from HR Department.
9. Use proper business letter format.
10. Return plain text only.

Generate a complete offer letter.
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

    return response.choices[0].message.content