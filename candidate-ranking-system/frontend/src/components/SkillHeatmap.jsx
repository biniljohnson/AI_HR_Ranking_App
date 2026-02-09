import { Title, Table, Badge } from "@mantine/core";

function scoreBadge(score) {
  if (score >= 8) return <Badge color="green">{score}</Badge>;
  if (score >= 5) return <Badge color="yellow">{score}</Badge>;
  return <Badge color="red">{score}</Badge>;
}

export default function SkillHeatmap({ data }) {
  return (
    <>
      <Title order={3} mb="md">
        Skill Heatmap (Top 10)
      </Title>
      <Table withTableBorder withColumnBorders>
        <thead>
          <tr>
            <th>Name</th>
            <th>Crisis</th>
            <th>Sustainability</th>
            <th>Motivation</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(0, 10).map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{scoreBadge(c.crisis_management_score)}</td>
              <td>{scoreBadge(c.sustainability_score)}</td>
              <td>{scoreBadge(c.team_motivation_score)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
