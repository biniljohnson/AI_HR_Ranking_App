import express from "express";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import cors from "cors";
import { generateCandidateSummary } from "./ai_summary.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

/**
 * Health check
 */
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend running" });
});

/**
 * Get full leaderboard data
 */
app.get("/api/leaderboard", async (req, res) => {
  const db = await mysql.createConnection(dbConfig);

  const [rows] = await db.execute(`
    SELECT
      c.id,
      c.name,
      c.years_experience,
      c.skills,
      e.crisis_management_score,
      e.sustainability_score,
      e.team_motivation_score,
      r.total_score,
      r.rank_position
    FROM candidates c
    JOIN evaluations e ON c.id = e.candidate_id
    JOIN rankings r ON c.id = r.candidate_id
    ORDER BY r.rank_position
  `);

  await db.end();
  res.json(rows);
});

/**
 * Recalculate rankings (auto-update)
 */
app.post("/api/recalculate-rankings", async (req, res) => {
  const db = await mysql.createConnection(dbConfig);

  await db.execute("DELETE FROM rankings");

  await db.execute(`
    INSERT INTO rankings (candidate_id, total_score, rank_position)
    SELECT
      c.id AS candidate_id,
      ROUND(
        (e.crisis_management_score +
         e.sustainability_score +
         e.team_motivation_score) / 3,
        2
      ) AS total_score,
      RANK() OVER (
        ORDER BY
          (e.crisis_management_score +
           e.sustainability_score +
           e.team_motivation_score) DESC,
          c.years_experience DESC
      ) AS rank_position
    FROM candidates c
    JOIN evaluations e ON c.id = e.candidate_id
  `);

  await db.end();
  res.json({ message: "Rankings updated successfully" });
});

/**
 * Generate candidate summary using AI
 */
app.post("/api/candidate-summary", async (req, res) => {
  const { candidateId } = req.body;
  const db = await mysql.createConnection(dbConfig);

  const [rows] = await db.execute(`
    SELECT
      c.id,
      c.name,
      c.years_experience,
      c.skills,
      e.crisis_management_score,
      e.sustainability_score,
      e.team_motivation_score
    FROM candidates c
    JOIN evaluations e ON c.id = e.candidate_id
    WHERE c.id = ?
  `, [candidateId]);

  if (!rows.length) {
    await db.end();
    return res.status(404).json({ error: "Candidate not found" });
  }

  const summary = await generateCandidateSummary(rows[0]);

  await db.end();
  res.json({ summary });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});