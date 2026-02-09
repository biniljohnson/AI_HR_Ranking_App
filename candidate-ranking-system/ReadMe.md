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

## ⚙️ Setup Instructions

### Clone Repository

```bash
git clone <your-repo-url>
cd candidate-ranking-system