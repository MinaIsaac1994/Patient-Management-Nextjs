"use client";
import icons from "@/components/icons";
import Topbar from "@/components/topbar";
import { tokens, useMode } from "@/theme";
import { useEffect, useState } from "react";
import { useToaster } from "@/config/Toaster";
import { TeamServices } from "@/services/teams";
import CustomTable from "../../components/Table";
import { Box, Fab, Typography } from "@mui/material";
import { TherapistServices } from "@/services/therapist";
import FormDialog from "@/components/dialogs/FormDialog";
import EditFormDialog from "@/components/dialogs/EditFormDialog";
import usePatientsColumns from "@/config/columns/usePatientsColumns";

const Patients = () => {
  const AddIcon = icons.Add;
  const { showToaster } = useToaster();
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const { columns } = usePatientsColumns();

  const [id, setId] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [openAddPatient, setOpenAddPatient] = useState(false);
  const [openEditPatient, setOpenEditPatient] = useState(false);

  useEffect(() => {
    fetchTherapists();
  }, []);

  const fetchTherapists = async () => {
    try {
      const data = await TherapistServices.fetchAll();
      setTherapists(data);
    } catch (err) {
      showToaster("error", err.message);
    }
  };

  const addTherapist = async (data) => {
    try {
      await TherapistServices.add(data);
      fetchTherapists();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  const removeTherapist = async ({ id }) => {
    try {
      await TherapistServices.remove(id);
      fetchTherapists();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  const editTherapist = async (data) => {
    try {
      await TherapistServices.edit(id, data);
      fetchTherapists();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  const fetchTherapistById = async () => {
    try {
      return await TherapistServices.fetchById(id);
    } catch (err) {
      showToaster("error", err.message);
    }
  };

  const handleEditClick = (row) => {
    setId(row?.id);
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
            data={therapists}
            columns={columns}
            // rowActions={[
            //   {
            //     icon: "Edit",
            //     name: "Edit",
            //     onClick: handleEditClick,
            //   },
            //   {
            //     icon: "Delete",
            //     name: "Delete",
            //     onClick: removeTherapist,
            //   },
            // ]}
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
          handleSubmit={addTherapist}
          onClose={() => setOpenAddPatient(false)}
          apiArr={[{ id: "teamId", apiCall: TeamServices.fetchAll }]}
        />
      )}
      {openEditPatient && (
        <EditFormDialog
          id={id}
          title="Edit Patient"
          open={openEditPatient}
          formStructer={formStructer}
          handleSubmit={editTherapist}
          fetchApi={fetchTherapistById}
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
    api: TeamServices.fetchAll,
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
    size: 8,
    type: "toggle",
    id: "specifity",
    label: "Specifity",
  },
];
