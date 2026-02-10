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

## File Directory

**Backend**
Has index.js which includes the sql queries for leaderboard, recalculating rankings and generating candidate summaries with AI.It also has ai_summary.js which includes the AI prompt and the call to the AI model for generating the AI summary of the candidate

**Database**
Has the CSV files of sample data from each table and the schema of the sql tables

**Frontend**
Has main.js, App.js and api.js (for the connections to the backend). It also includes components folder which has the CanidateCard, Leaderboard and SkillHeatmap files.

**Generator**
Has generateCandidate for using faker to generate sample candidates and evaluateCandidate for evaluating the generated candidates.

**Files**
Has the [ai-prompts](https://github.com/biniljohnson/AI_HR_Ranking_App/blob/e37f0110b906c432331273b5974c3e25545494b2/candidate-ranking-system/files/ai-prompts.md) and the [screenshots](https://github.com/biniljohnson/AI_HR_Ranking_App/blob/bfa9b44e6bfac52704ada1342cbab82b07a186e5/candidate-ranking-system/files/Screenshots.pdf) of the app.

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

Tables (with links to sample data):
- `candidates` – basic candidate profiles
- `evaluations` – AI evaluation scores
- `rankings` – auto-updated competitive rankings

Schema and Sample data are availabla in [database](https://github.com/biniljohnson/AI_HR_Ranking_App/tree/e37f0110b906c432331273b5974c3e25545494b2/candidate-ranking-system/database)

---

## Setup Instructions

### Pre-requisite
Make sure MySQL and node is downloaded on the device.

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
Open the database folder in terminal and then open mysql by entering
```bash
mysql -u root -p
```
Then enter your mysql password (when prompted).

Run the below file in the mysql terminal for setting up the database table schemas.
```bash
SOURCE path/database/schema.sql;
```

### 4. Generate and Evaluate Files
Open the generator folder in a new terminal.
Run
```bash
node generateCandidates.js
```
This will generate the sample candidates.

Next, run 
```bash
node evaluateCandidate.js
```

### 5. Backend Setup
In a new terminal
```bash
cd backend
npm install
```
Then, run the backend with 
```bash
node index.js
```
Backend runs on http://localhost:4000

### 6. Frontend Setup
In a new terminal (with the backend still running),
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

The AI Prompts are present in [ai-prompts.md](https://github.com/biniljohnson/AI_HR_Ranking_App/blob/e37f0110b906c432331273b5974c3e25545494b2/candidate-ranking-system/files/ai-prompts.md)

Rankings:
- Primary ranking is the total average AI score.
- Tie-breaker: If the average scores are equal, then years of experience is considered a priority.
- Equal score + experience will result in a shared rank (competitive ranking)

---

## AI Candidate Summary
The “Share Candidate” button generates an AI-written HR summary using Groq.
The summary uses only database fields and AI scores. The summaries can be copied for further use.
The prompt is mentioned in [ai-prompts.md](https://github.com/biniljohnson/AI_HR_Ranking_App/blob/e37f0110b906c432331273b5974c3e25545494b2/candidate-ranking-system/files/ai-prompts.md)



