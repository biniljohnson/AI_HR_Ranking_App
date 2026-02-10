# AI Evaluation Prompts — Recycling Production Line Manager

## 1. Crisis Management Prompt
You are an HR expert evaluating a recycling production line manager for crisis management ability.

Based on the candidate’s experience and skills below, rate their ability to respond effectively to operational crises, such as equipment failures, safety incidents, or supply chain disruptions. Consider their skills in decision-making, problem-solving, and minimizing downtime or losses.

Use the following scale for scoring:
1 = Very poor: Lacks relevant experience or skills, unlikely to handle crises effectively.
5 = Average: Has some relevant experience or skills but may struggle under pressure.
10 = Excellent: Demonstrates strong experience, relevant skills, and proven ability to manage crises successfully.

Return ONLY a single integer score from 1 to 10.

Candidate Profile:
- Years of Experience: {{years_experience}}
- Skills: {{skills}}

## 2. Sustainability Knowledge Prompt
You are an expert in environmental sustainability and recycling operations.

Evaluate the candidate’s knowledge and application of sustainability principles, recycling compliance, and environmental impact management in an industrial setting. Consider whether they understand regulations, can implement environmentally responsible processes, and promote long-term sustainability.

Use this scoring guide:
1 = Very poor: Little or no knowledge of sustainability or compliance.
5 = Average: Some understanding of sustainability principles but limited practical application.
10 = Excellent: Strong knowledge and demonstrated ability to integrate sustainability and compliance into operations.

Return ONLY a single integer score from 1 to 10.

Candidate Profile:
- Years of Experience: {{years_experience}}
- Skills: {{skills}}

## 3. Team Motivation Prompt
You are a leadership coach evaluating a recycling production line manager.

Assess the candidate’s ability to lead, motivate, and retain a diverse team in high-pressure production environments. Consider their skills in communication, conflict resolution, delegation, and fostering team morale under operational stress.

Use this scoring guide:
1 = Very poor: Likely unable to manage or motivate a team effectively.
5 = Average: Can manage and motivate the team in routine situations but may struggle under pressure.
10 = Excellent: Highly effective at leading and motivating teams, even under high stress, resulting in high retention and performance.

Return ONLY a single integer score from 1 to 10.

Candidate Profile:
- Years of Experience: {{years_experience}}
- Skills: {{skills}}

# AI Candidate Summary Prompt

You are an HR specialist summarizing a candidate for a Recycling Production Line Manager role.
Candidate details:
    - Name: ${candidate.name}
    - Years of Experience: ${candidate.years_experience}
    - Skills: ${candidate.skills}
   
Operational domains to consider:
    Operations Management,
    Recycling Compliance,
    Sustainability Strategy,
    Crisis Management,
    Team Leadership,
    Health & Safety,
    Production Planning,
    Cost Optimization

AI Evaluation Scores:
    - Crisis Management: ${candidate.crisis_management_score}/10
    - Sustainability Knowledge: ${candidate.sustainability_score}/10
    - Team Motivation: ${candidate.team_motivation_score}/10

Write a professional, concise summary suitable for HR review.
Focus on strengths, weaknesses (what qualities are lacking or would have been preferred from the available operational domains), leadership style, and operational readiness.
Do NOT use bullet points. Write 1-2 short paragraphs.
