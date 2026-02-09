import { Card, Text, Button, Group, Title, Badge, Modal, Textarea } from "@mantine/core";
import { useState } from "react";
import { fetchCandidateSummary } from "../api";

export default function CandidateCard({ data }) {
  const [opened, setOpened] = useState(false);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleShare(candidateId) {
    setLoading(true);
    setOpened(true);
    const res = await fetchCandidateSummary(candidateId);
    setSummary(res.summary);
    setLoading(false);
  }

  return (
    <>
      <Title order={3} mb="md">Candidate Profiles</Title>

      {data.slice(0, 5).map((c) => (
        <Card key={c.id} shadow="xs" withBorder mb="sm">
          <Group justify="space-between">
            <Text fw={600}>{c.name}</Text>
            <Badge>Rank #{c.rank_position}</Badge>
          </Group>

          <Text size="sm">Experience: {c.years_experience} years</Text>
          <Text size="sm">Skills: {c.skills.join(", ")}</Text>

          <Button
            mt="sm"
            size="xs"
            variant="light"
            loading={loading}
            onClick={() => handleShare(c.id)}
          >
            Share Candidate
          </Button>
        </Card>
      ))}

      <Modal opened={opened} onClose={() => setOpened(false)} title="AI Candidate Summary" size="lg">
        <Textarea
          minRows={6}
          value={summary}
          readOnly
        />
      </Modal>
    </>
  );
}
