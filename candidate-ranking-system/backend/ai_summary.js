import Groq from "groq-sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from project root
dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function generateCandidateSummary(candidate) {
  const prompt = `
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
  Focus on strengths, weaknesses (what qualities are lacking or would have been preferred from the available operational domains), 
  leadership style, and operational readiness.
  Do NOT use bullet points. Write 1-2 short paragraphs.
  `;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.4,
  });

  return completion.choices[0].message.content;
}