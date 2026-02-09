import { Title } from "@mantine/core";
import { MantineReactTable } from "mantine-react-table";
import { useMemo } from "react";

export default function Leaderboard({ data }) {
  const columns = useMemo(
    () => [
      { accessorKey: "rank_position", header: "Rank" },
      { accessorKey: "name", header: "Name" },
      { accessorKey: "total_score", header: "Total Score" },
    ],
    []
  );

  return (
    <>
      <Title order={3} mb="md">
        Top 10 Candidates
      </Title>
      <MantineReactTable
        columns={columns}
        data={data}
        enableSorting
        enableColumnFilters
      />
    </>
  );
}
