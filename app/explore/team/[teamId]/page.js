"use client";
import Topbar from "@/components/topbar";
import { useEffect, useState } from "react";
import TopCards from "./component/TopCards";
import { useToaster } from "@/config/Toaster";
import Operations from "./component/Operations";
import { TeamServices } from "@/services/teams";
import { PatientModel } from "@/models/patients";
import { Box, Divider, Grid, Tab, Tabs } from "@mui/material";
import EditFormDialog from "@/components/dialogs/EditFormDialog";
import usePatientsColumns from "@/config/columns/usePatientsColumns";
import { TherapistModel } from "@/models/therapists";
import useTherapistsColumns from "@/config/columns/useTherapistsColumns";

const TeamPage = ({ params }) => {
  const { showToaster } = useToaster();
  const [team, setTeam] = useState({});
  const [patients, setPatients] = useState({});
  const [therapists, setTherapists] = useState({});

  const [patientSkeleton] = usePatientsColumns();

  const [openEditPatient, setOpenEditPatient] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const {
        patients: patientsJSON,
        users: TherapistsJson,
        ...data
      } = await TeamServices.fetchById(params.teamId);
      //
      const [patientsData, patientsColumns] = PatientModel.fetchAll(
        patientsJSON,
        patientSkeleton
      );
      // const [TherapistsData, TherapistsColumns] = TherapistModel.fetchAll(
      //   TherapistsJson,
      //   therapistSkeleton
      // );
      //
      setTeam(data);
      setPatients({ patientsData, patientsColumns });
      setTherapists(TherapistsJson);
    } catch (error) {
      showToaster("error", error.message);
    }
  };

  const addPatient = async (data) => {
    try {
      const result = await PatientServices.add(data);
      if (result) setOpenAddPatient(false);
      fetchPatients();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  const removePatient = async ({ nhs_number }) => {
    try {
      await PatientServices.remove(nhs_number);
      fetchPatients();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  const editPatient = async (data) => {
    try {
      const result = await PatientServices.edit(id, data);
      if (result) setOpenAddPatient(false);
      fetchPatients();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  const fetchPatientById = async () => {
    try {
      return await PatientServices.fetchById(id);
    } catch (err) {
      showToaster("error", err.message);
    }
  };

  const handleEditClick = (row) => {
    setId(row?.nhs_number);
    setOpenEditPatient(true);
  };

  return (
    <>
      <Box className="w-full h-full px-4 overflow-y-scroll">
        <Box>
          <Topbar title={team?.name + " Team"} />
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopCards />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ mx: 5 }} />
          </Grid>
          <Operations patients={patients} therapists={therapists} />
        </Grid>
      </Box>
      {openEditPatient && (
        <EditFormDialog
          title="Edit Patient"
          open={openEditPatient}
          handleSubmit={editPatient}
          formStructer={formStructer}
          fetchApi={fetchPatientById}
          onClose={() => setOpenEditPatient(false)}
          apiArr={[{ id: "teamId", apiCall: TeamServices.fetchAll }]}
        />
      )}
    </>
  );
};

export default TeamPage;
// const addContacts = (row, day = "") => row?.visits[day]?.length ?? 0;

// const today = moment().format("ddd");

// const isToday = (day) => day === today.toLowerCase();
// const headStyle = (column) =>
//   isToday(column.id)
//     ? {
//         sx: {
//           backgroundColor: "#94949448",
//         },
//       }
//     : null;
// const cellStyle = (column) =>
//   isToday(column.id)
//     ? {
//         sx: {
//           backgroundColor: "#80808021",
//         },
//       }
//     : null;

// const daysOfWeek = () => {
//   const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   const dayNumber = moment().weekday(1);

//   const columns = days.map((id, i) => ({
//     accessorFn: (row) => addContacts(row, id),
//     Cell: ({ renderedCellValue, row }) => (
//       <VisitIcons value={renderedCellValue} row={row} day={id} />
//     ),
//     // Footer: ({ column }) => (
//     //   <ColumnFooter day={column.id} column={column} />
//     // ),
//     id: id + dayNumber,
//     header: id,
//     size: 20,
//     enableSorting: false,
//     enableGrouping: false,
//     enableColumnActions: false,
//     enableColumnDragging: false,
//     muiTableHeadCellProps: ({ column }) => headStyle(column),
//     muiTableBodyCellProps: ({ column }) => cellStyle(column),
//   }));
//   return columns;
// };
