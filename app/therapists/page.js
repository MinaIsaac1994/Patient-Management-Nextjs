"use client";
import icons from "@/components/icons";
import Topbar from "@/components/topbar";
import { tokens, useMode } from "@/theme";
import CustomTable from "./components/Table";
import { useToaster } from "@/config/Toaster";
import { TeamServices } from "@/services/teams";
import { useEffect, useMemo, useState } from "react";
import { TherapistServices } from "@/services/therapist";
import FormDialog from "@/components/dialogs/FormDialog";
import { Box, Fab, Typography, Chip } from "@mui/material";
import EditFormDialog from "@/components/dialogs/EditFormDialog";

const Therapists = () => {
  const AddIcon = icons.Add;
  const { showToaster } = useToaster();
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  const [id, setId] = useState(null);
  const [therapists, setTherapists] = useState([]);
  const [openAddTherapists, setOpenAddTherapists] = useState(false);
  const [openEditTherapist, setOpenEditTherapist] = useState(false);

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
    setOpenEditTherapist(true);
  };

  const columns = useMemo(
    () => [
      {
        id: "therapists",
        header: "Therapist",
        columns: [
          {
            accessorKey: "name",

            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Name",
            size: 250,
            Cell: ({ cell }) => (
              <Typography sx={{ fontWeight: "400", fontSize: "16px" }}>
                {cell.getValue()}
              </Typography>
            ),
            // Cell: ({ renderedCellValue, row }) => (
            //   <Box
            //     sx={{
            //       display: "flex",
            //       alignItems: "center",
            //       gap: "1rem",
            //     }}
            //   >
            //     <img
            //       alt="avatar"
            //       height={30}
            //       src={row.original.avatar}
            //       loading="lazy"
            //       style={{ borderRadius: "50%" }}
            //     />
            //     {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
            //     <span>{renderedCellValue}</span>
            //   </Box>
            // ),
          },
          {
            accessorKey: "team.name", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            // enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Team",
            size: 100,
            Cell: ({ cell }) => (
              <Typography sx={{ fontWeight: "400", fontSize: "14px" }}>
                {cell.getValue()}
              </Typography>
            ),
          },
        ],
      },
      {
        id: "role",
        header: "Role",
        columns: [
          {
            accessorKey: "band",
            filterVariant: "select",
            filterSelectOptions: bandList,
            header: "Band",
            size: 100,

            Cell: ({ cell }) => (
              <Chip
                label={
                  <Typography
                    textAlign="center"
                    sx={{ fontWeight: "600", fontSize: "16px" }}
                  >
                    {cell.getValue()}
                  </Typography>
                }
                color="default"
                variant="filled"
              />
            ),
          },
          {
            accessorKey: "speciality",
            header: "Speciality",
            size: 150,
            Cell: ({ cell }) => {
              const specialities = {
                PT: "Physiotherapist",
                OT: "Occupational Therapist",
                TA: "Therapy Assistant",
              };

              return (
                <Typography
                  textAlign="center"
                  sx={{ fontWeight: "600", fontSize: "14px" }}
                >
                  {specialities[cell.getValue()]}
                </Typography>
              );
            },
          },
          {
            id: "availability",
            header: "Availability",
            accessorKey: "availability",
            Cell: ({ cell }) => {
              const isAvail = cell.getValue();
              return (
                <Chip
                  label={
                    <Typography
                      textAlign="center"
                      sx={{ fontWeight: "400", fontSize: "14px" }}
                    >
                      {isAvail ? "Available" : "Unavailable"}
                    </Typography>
                  }
                  color={isAvail ? "success" : "default"}
                  variant="filled"
                />
              );
            },
            // Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            // muiFilterTextFieldProps: {
            //   sx: {
            //     minWidth: "250px",
            //   },
            // },
          },
        ],
      },
    ],
    []
  );

  return (
    <>
      <Box className=" w-full rounded-xl h-full px-5 overflow-y-scroll">
        <Box>
          <Topbar title="Therapists" />
        </Box>
        <Box sx={{ m: 1 }}>
          <CustomTable
            data={therapists}
            columns={columns}
            rowActions={[
              {
                icon: "Edit",
                name: "Edit",
                onClick: handleEditClick,
              },
              {
                icon: "Delete",
                name: "Delete",
                onClick: removeTherapist,
              },
            ]}
          />
        </Box>
        <Fab
          onClick={() => setOpenAddTherapists(true)}
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
          <Typography variant="h5">Therapist</Typography>
        </Fab>
      </Box>
      {openAddTherapists && (
        <FormDialog
          open={openAddTherapists}
          title="Add New Therapist"
          formStructer={formStructer}
          handleSubmit={addTherapist}
          onClose={() => setOpenAddTherapists(false)}
          apiArr={[{ id: "teamId", apiCall: TeamServices.fetchAll }]}
        />
      )}
      {openEditTherapist && (
        <EditFormDialog
          id={id}
          title="Edit Therapist"
          open={openEditTherapist}
          formStructer={formStructer}
          handleSubmit={editTherapist}
          fetchApi={fetchTherapistById}
          onClose={() => setOpenEditTherapist(false)}
          apiArr={[{ id: "teamId", apiCall: TeamServices.fetchAll }]}
        />
      )}
    </>
  );
};

// add icons
export default Therapists;
const bandList = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const { Name, Speciality, Band, Badge, Number } = icons;
const formStructer = [
  { label: "Name", id: "name", size: 6, Icon: () => <Name /> },
  {
    size: 6,
    type: "select",
    id: "speciality",
    label: "Speciality",
    list: [
      { label: "Physiotherapist", value: "PT" },
      { label: "Occupational Therapist", value: "OT" },
      { label: "Therapy Assistance", value: "TA" },
    ],
    Icon: () => <Speciality />,
  },
  {
    size: 8,
    label: "Employee number",
    id: "employee_number",
    Icon: () => <Number />,
  },
  { label: "Band", id: "band", size: 4, Icon: () => <Band /> },
  {
    size: 12,
    id: "teamId",
    label: "Team",
    type: "select",
    Icon: () => <Badge />,
    api: TeamServices.fetchAll,
  },
  {
    label: "Available",
    id: "availability",
    size: 12,
    type: "switch",
    value: true,
  },
];
