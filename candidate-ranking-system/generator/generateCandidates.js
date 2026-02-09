import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const SKILLS_POOL = [
  "Operations Management",
  "Recycling Compliance",
  "Sustainability Strategy",
  "Crisis Management",
  "Team Leadership",
  "Health & Safety",
  "Production Planning",
  "Cost Optimization"
];

async function generateCandidates() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  console.log("Connected to MySQL");

  for (let i = 0; i < 40; i++) {
    const name = faker.person.fullName();
    const yearsExperience = faker.number.int({ min: 3, max: 20 });

    const skillsCount = faker.number.int({ min: 4, max: 7 });
    const skills = faker.helpers.arrayElements(SKILLS_POOL, skillsCount);

    await connection.execute(
      `INSERT INTO candidates (name, years_experience, skills)
       VALUES (?, ?, ?)`,
      [name, yearsExperience, JSON.stringify(skills)]
    );
  }

  await connection.end();
  console.log("40 candidates inserted successfully");
}

generateCandidates().catch(console.error);