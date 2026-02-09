import { Container, Title, Divider, Button, Group, Card, Accordion } from "@mantine/core";
import { useEffect, useState } from "react";
import { fetchLeaderboard, recalculateRankings } from "./api";
import Leaderboard from "./components/Leaderboard";
import SkillHeatmap from "./components/SkillHeatmap";
import CandidateCard from "./components/CandidateCard";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    const result = await fetchLeaderboard();
    setData(result);
  }

  async function handleRecalculate() {
    setLoading(true);
    await recalculateRankings();
    await loadData();
    setLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <Container size="xl">
      <Title order={1} mt="md">
        Recycling Production Line Manager - AI Candidate Ranking
      </Title>

      <Group mt="md">
        <Button onClick={handleRecalculate} loading={loading}>
          Refresh Rankings
        </Button>
      </Group>

      <Divider my="lg" />

      {/* <Card shadow="sm" radius="md" withBorder>
        <Leaderboard data={data.slice(0, 10)} />
      </Card>

      <Divider my="xl" />

      <Card shadow="sm" radius="md" withBorder>
        <SkillHeatmap data={data} />
      </Card>

      <Divider my="xl" />

      <Card shadow="sm" radius="md" withBorder>
        <CandidateCard data={data} />
      </Card> */}

      <Accordion multiple defaultValue={["leaderboard"]}>
        <Accordion.Item value="leaderboard">
          <Accordion.Control>Top 10 Leaderboard</Accordion.Control>
          <Accordion.Panel>
            <Leaderboard data={data.slice(0, 10)} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="heatmap">
          <Accordion.Control>Skill Heatmap</Accordion.Control>
          <Accordion.Panel>
            <SkillHeatmap data={data} />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="profiles">
          <Accordion.Control>Candidate Profiles</Accordion.Control>
          <Accordion.Panel>
            <CandidateCard data={data} />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

    </Container>
  );
}