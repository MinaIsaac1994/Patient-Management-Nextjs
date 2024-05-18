"use client";
import { useToaster } from "@/config/Toaster";
import { TeamServices } from "@/services/teams";
import { Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import TopCards from "./component/TopCards";
import Topbar from "@/components/topbar";
import Table from "@/components/Table";
import { Opel } from "@/components/Opel";
import VisitIcons from "@/components/VisitIcons";
import moment from "moment";

const TeamPage = ({ params }) => {
  const { showToaster } = useToaster();
  const [team, setTeam] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TeamServices.fetchById(params.teamId);
        setTeam(data);
      } catch (error) {
        showToaster("error", err.message);
      }
    };
    fetchData();
  }, []);
  const columns = useMemo(
    () => [
      {
        id: "patients",
        header: "Patients",
        // showColumnFilters: false,
        columns: [
          {
            enableClickToCopy: true,
            accessorKey: "name",
            header: "Full Name",
            size: 150,
            enableColumnDragging: false,
          },
          {
            enableClickToCopy: true,
            accessorKey: "dob",
            header: "DOB",
            size: 100,
            enableColumnDragging: false,
          },
          {
            enableClickToCopy: true,
            accessorKey: "nhs_number",
            header: "NHS",
            size: 100,
            enableSorting: false,
            enableGrouping: false,
            enableColumnDragging: false,
          },
        ],
      },
      {
        id: "visits",
        header: `Visits (${moment().month() + 1}/${moment().year()})`,
        showColumnFilters: true,
        columns: daysOfWeek(),
      },
      {
        accessorKey: "opel",
        header: "Opel",
        size: 15,
        Cell: ({ cell }) => <Opel opel={cell.getValue()} />,
      },
    ],
    []
  );

  return (
    <Box className="w-full h-full px-4 overflow-y-scroll">
      <Box>
        <Topbar title={team?.name + " Team"} />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <TopCards />
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mx: 5 }} />
        </Grid>
        <Grid item xs={12} sx={{ mx: 1 }}>
          <Table data={[]} columns={columns} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default TeamPage;
const addContacts = (row, day = "") => row?.visits[day]?.length ?? 0;

const today = moment().format("ddd");
console.log(today);
const isToday = (day) => day === today.toLowerCase();
const headStyle = (column) =>
  isToday(column.id)
    ? {
        sx: {
          backgroundColor: "#94949448",
        },
      }
    : null;
const cellStyle = (column) =>
  isToday(column.id)
    ? {
        sx: {
          backgroundColor: "#80808021",
        },
      }
    : null;

const daysOfWeek = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const dayNumber = moment().weekday(1);

  const columns = days.map((id, i) => ({
    accessorFn: (row) => addContacts(row, id),
    Cell: ({ renderedCellValue, row }) => (
      <VisitIcons value={renderedCellValue} row={row} day={id} />
    ),
    // Footer: ({ column }) => (
    //   <ColumnFooter day={column.id} column={column} />
    // ),
    id: id + dayNumber,
    header: id,
    size: 20,
    enableSorting: false,
    enableGrouping: false,
    enableColumnActions: false,
    enableColumnDragging: false,
    muiTableHeadCellProps: ({ column }) => headStyle(column),
    muiTableBodyCellProps: ({ column }) => cellStyle(column),
  }));
  return columns;
};
