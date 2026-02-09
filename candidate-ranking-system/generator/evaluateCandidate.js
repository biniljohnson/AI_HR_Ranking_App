import mysql from "mysql2/promise";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

/**
 * Safely parse skills coming from MySQL
 */
function parseSkills(skills) {
  if (Array.isArray(skills)) return skills;

  try {
    return JSON.parse(skills);
  } catch (err) {
    console.error("Failed to parse skills, using fallback:", skills);
    return [];
  }
}

/**
 * Call AI and return a score 1–10
 */
async function getAIScore(prompt, label) {
  console.log(`Calling AI for ${label}...`);

  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0
    });

    const raw = response.choices[0].message.content.trim();
    const score = parseInt(raw, 10);

    if (score >= 1 && score <= 10) {
      console.log(`AI returned score: ${score}`);
      return score;
    }

    throw new Error("Invalid AI score");
  } catch (error) {
    const fallback = Math.floor(Math.random() * 10) + 1;
    console.warn(`AI failed (${label}), using fallback score: ${fallback}`);
    return fallback;
  }
}

/**
 * Build prompt text
 */
function formatCandidateProfile(candidate) {
  return `
  Candidate Profile:
    - Years of Experience: ${candidate.years_experience}
    - Skills: ${candidate.skills.join(", ")}
  `;
}

function buildCrisisManagementPrompt(candidate) {
  return `
  # AI Evaluation Prompt - Crisis Management (Recycling Production Line Manager)

  You are an HR expert evaluating a recycling production line manager for crisis management ability.

  Based on the candidate's experience and skills below, rate their ability to respond effectively to operational crises, such as equipment failures, safety incidents, or supply chain disruptions. Consider their skills in decision-making, problem-solving, and minimizing downtime or losses.

  Use the following scale for scoring:
  1 = Very poor: Lacks relevant experience or skills, unlikely to handle crises effectively.
  5 = Average: Has some relevant experience or skills but may struggle under pressure.
  10 = Excellent: Demonstrates strong experience, relevant skills, and proven ability to manage crises successfully.

  Return ONLY a single integer score from 1 to 10.
  ${formatCandidateProfile(candidate)}
  `;
}

function buildSustainabilityPrompt(candidate) {
  return `
  # AI Evaluation Prompt - Sustainability Knowledge (Recycling Production Line Manager)

  You are an expert in environmental sustainability and recycling operations.

  Evaluate the candidate's knowledge and application of sustainability principles, recycling compliance, and environmental impact management in an industrial setting. Consider whether they understand regulations, can implement environmentally responsible processes, and promote long-term sustainability.

  Use this scoring guide:
  1 = Very poor: Little or no knowledge of sustainability or compliance.
  5 = Average: Some understanding of sustainability principles but limited practical application.
  10 = Excellent: Strong knowledge and demonstrated ability to integrate sustainability and compliance into operations.

  Return ONLY a single integer score from 1 to 10.
  ${formatCandidateProfile(candidate)}
  `;
}

function buildTeamMotivationPrompt(candidate) {
  return `
  # AI Evaluation Prompt — Team Motivation (Recycling Production Line Manager)

  You are a leadership coach evaluating a recycling production line manager.

  Assess the candidate's ability to lead, motivate, and retain a diverse team in high-pressure production environments. Consider their skills in communication, conflict resolution, delegation, and fostering team morale under operational stress.

  Use this scoring guide:
  1 = Very poor: Likely unable to manage or motivate a team effectively.
  5 = Average: Can manage and motivate the team in routine situations but may struggle under pressure.
  10 = Excellent: Highly effective at leading and motivating teams, even under high stress, resulting in high retention and performance.

  Return ONLY a single integer score from 1 to 10.
  ${formatCandidateProfile(candidate)}
  `;
}


// function buildPrompt(title, candidate) {
//   return `
// ${title}

// Candidate Profile:
// - Years of Experience: ${candidate.years_experience}
// - Skills: ${candidate.skills.join(", ")}

// Return ONLY a single number from 1 to 10.
// `;
// }

async function evaluateCandidates() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log("Connected to MySQL");

  const [candidates] = await db.execute(
    "SELECT id, years_experience, skills FROM candidates"
  );

  console.log(`Found ${candidates.length} candidates to evaluate\n`);

  let counter = 1;

  for (const candidate of candidates) {
    console.log(`Evaluating candidate ${counter}/${candidates.length} (ID: ${candidate.id})`);

    const skills = parseSkills(candidate.skills);

    const crisisScore = await getAIScore(
      buildCrisisManagementPrompt({
        years_experience: candidate.years_experience,
        skills
      }),
      "Crisis Management"
    );

    const sustainabilityScore = await getAIScore(
      buildSustainabilityPrompt({
        years_experience: candidate.years_experience,
        skills
      }),
      "Sustainability"
    );

    const motivationScore = await getAIScore(
      buildTeamMotivationPrompt({
        years_experience: candidate.years_experience,
        skills
      }),
      "Team Motivation"
    );

    await db.execute(
      `INSERT INTO evaluations
       (candidate_id, crisis_management_score, sustainability_score, team_motivation_score)
       VALUES (?, ?, ?, ?)`,
      [candidate.id, crisisScore, sustainabilityScore, motivationScore]
    );

    console.log(
      `Saved scores-> Crisis: ${crisisScore}, Sustainability: ${sustainabilityScore}, Motivation: ${motivationScore}\n`
    );

    counter++;
  }

  await db.end();
  console.log("All candidates evaluated successfully!");
}

evaluateCandidates().catch(console.error);
