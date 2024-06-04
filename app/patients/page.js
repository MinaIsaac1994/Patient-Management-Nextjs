"use client";
import icons from "@/components/icons";
import Topbar from "@/components/topbar";
import { tokens, useMode } from "@/theme";
import { useEffect, useState } from "react";
import { useToaster } from "@/config/Toaster";
import { TeamServices } from "@/services/teams";
import CustomTable from "../../components/Table";
import { WardsServices } from "@/services/wards";
import { PatientModel } from "@/models/patients";
import { Box, Fab, Typography } from "@mui/material";
import { PatientServices } from "@/services/patients";
import { TherapistServices } from "@/services/therapist";
import FormDialog from "@/components/dialogs/FormDialog";
import EditFormDialog from "@/components/dialogs/EditFormDialog";
import usePatientsColumns from "@/config/columns/usePatientsColumns";
import DetailPanel from "@/components/detailPanels/patientDetailPanel";

const Patients = () => {
  const AddIcon = icons.Add;
  const { showToaster } = useToaster();
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const { columns } = usePatientsColumns();

  const [id, setId] = useState(null);
  const [patients, setPatients] = useState([]);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [openEditPatient, setOpenEditPatient] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const data = await PatientServices.fetchAll();
      const mappedData = PatientModel.fetchAll(data, columns);
      setPatients(mappedData);
    } catch (err) {
      showToaster("error", err.message);
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
      <Box className=" w-full rounded-xl h-full px-5 overflow-y-scroll">
        <Box>
          <Topbar title="Patients" />
        </Box>
        <Box sx={{ m: 1 }}>
          <CustomTable
            data={patients}
            columns={columns}
            detailPanel={({ row }) => (
              <DetailPanel row={row.original?.detailPanel} />
            )}
            rowActions={[
              {
                icon: "Edit",
                name: "Edit",
                onClick: handleEditClick,
              },
              {
                icon: "Delete",
                name: "Delete",
                onClick: removePatient,
              },
            ]}
          />
        </Box>
        <Fab
          onClick={() => setOpenAddPatient(true)}
          size="large"
          variant="extended"
          sx={(theme) => ({
            position: "fixed",
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            color: theme.palette.success.light,
          })}
        >
          <AddIcon fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="h5">Patients</Typography>
        </Fab>
      </Box>
      {openAddPatient && (
        <FormDialog
          open={openAddPatient}
          title="Add New Patient"
          formStructer={formStructer}
          handleSubmit={addPatient}
          onClose={() => setOpenAddPatient(false)}
          apiArr={[{ id: "teamId", apiCall: TeamServices.fetchAll }]}
        />
      )}
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

// add icons
export default Patients;

const { Name, Badge, Number, Home, Map, Diagnosis, Info } = icons;
const formStructer = [
  { label: "Full Name", id: "name", size: 12, Icon: () => <Name /> },
  {
    size: 8,
    label: "NHS",
    id: "nhs_number",
    Icon: () => <Number />,
  },
  {
    size: 4,
    type: "date",
    label: "Date of Birth",
    id: "DOB",
    Icon: () => <Number />,
  },
  {
    size: 8,
    label: "Address",
    id: "address",
    Icon: () => <Home />,
  },
  {
    size: 4,
    type: "select",
    id: "area",
    label: "Area",
    list: [
      { label: "Medway", value: "medway" },
      { label: "Swale", value: "swale" },
      { label: "Out of area", value: "ofa" },
    ],
    Icon: () => <Map />,
  },

  {
    size: 4,
    id: "wardId",
    label: "Ward",
    type: "select",
    Icon: () => <Badge />,
    api: WardsServices.fetchAll,
  },
  { label: "Diagnosis", id: "diagnosis", size: 8, Icon: () => <Diagnosis /> },
  {
    label: "Details",
    id: "details",
    size: 12,
    Icon: () => <Info />,
    multiline: true,
  },
  {
    size: 12,
    type: "toggle",
    id: "specificity",
    label: "Specificity",
  },
  {
    size: 12,
    type: "slider",
    id: "priority",
    label: "Opel",
  },
];
