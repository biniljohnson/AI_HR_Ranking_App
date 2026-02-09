# AI Candidate Ranking System – Recycling Production Line Manager

This project is a minimal, standalone system for ranking candidates for a Recycling Production Line Manager role using structured data and AI-assisted evaluation.

It demonstrates database design, AI prompting, backend automation, and a functional frontend dashboard.

---

## Features

- MySQL-compatible database schema
- Automated AI-based candidate evaluation
- Competitive ranking
- React + Vite dashboard
- Sortable leaderboard and skill heatmap
- AI-generated HR candidate summaries
- Clean, interview-ready architecture

---

## Tech Stack

**Frontend**
- React + Vite
- Mantine UI
- Mantine React Table

**Backend**
- Node.js (Express)
- MySQL
- Groq LLM API

**AI**
- LLaMA 3.3 via Groq
- Structured prompt-based summarization

---

## Database Schema

Tables:
- `candidates` – basic candidate profiles
- `evaluations` – AI evaluation scores
- `rankings` – auto-updated competitive rankings

Schema and seed data are available in `/database`.

---

## Setup Instructions

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd candidate-ranking-system
```
### 2. Create a .env file in the following structure
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=candidate_ranking
GROQ_API_KEY=your_groq_key


### 3. Database Setup
Run the below file in the mysql terminal for setting up the database table schemas.
```bash
SOURCE database/schema.sql;
```

### 4. Backend Setup
```bash
cd backend
npm install
```
Then, run the backend with 
```bash
node index.js
```
Backend runs on http://localhost:4000

### 5. Frontend Setup
In a new terminal,
```bash
cd frontend
npm install
npm run dev
```
Frontend runs on http://localhost:5173

---

## AI Evaluation Logic
Candidates are evaluated on:
1. Crisis Management
2. Sustainability Knowledge
3. Team Motivation

Scores (1–10) are generated using AI prompts and stored in the database.

Rankings:
- Primary ranking is the total average AI score.
- Tie-breaker: If the average scores are equal, then years of experience is considered a priority.
- Equal score + experience will result in a shared rank (competitive ranking)

---

## AI Candidate Summary
The “Share Candidate” button generates an AI-written HR summary using Groq.
The summary uses only database fields and AI scores. The summaries can be copied for further use.
The prompt is mentioned in the ai-prompts.md file
