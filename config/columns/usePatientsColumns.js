"use client";
import { useMemo } from "react";
import { Chip, Typography } from "@mui/material";

const usePatientsColumns = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        id: "name",
        enableClickToCopy: true,
        header: "Full Name",
        // size: 250,
      },
      {
        // size: 100,
        header: "NHS",
        enableClickToCopy: true,
        accessorKey: "nhs_number",
      },

      {
        header: "DOB",
        accessorKey: "DOB",
        filterVariant: "date",
        enableClickToCopy: true,
      },
      {
        size: 150,
        header: "Team",
        accessorKey: "team",
      },
      {
        size: 150,
        header: "Ward",
        accessorKey: "ward",
      },
      {
        size: 100,
        header: "Priority",
        accessorKey: "priority",
      },
    ],
    []
  );
  return { columns };
};

export default usePatientsColumns;
