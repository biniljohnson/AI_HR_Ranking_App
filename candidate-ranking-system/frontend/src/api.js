const API_BASE = "http://localhost:4000/api";

export async function fetchLeaderboard() {
  const res = await fetch(`${API_BASE}/leaderboard`);
  return res.json();
}

export async function recalculateRankings() {
  const res = await fetch(`${API_BASE}/recalculate-rankings`, {
    method: "POST",
  });
  return res.json();
}

export async function fetchCandidateSummary(candidateId) {
  const res = await fetch(`${API_BASE}/candidate-summary`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ candidateId }),
  });
  return res.json();
}
