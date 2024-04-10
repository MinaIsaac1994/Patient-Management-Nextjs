import icons from "@/components/icons";
import { useEffect, useState } from "react";
import { useToaster } from "@/config/Toaster";
import { Fab, Typography } from "@mui/material";
import TeamCard from "@/components/cards/TeamCard";
import FormDialog from "@/components/dialogs/FormDialog";
import { TherapistServices } from "@/services/therapist";
import { WardsServices } from "@/services/wards";
import { TeamServices } from "@/services/teams";

export const WardsComponent = ({}) => {
  const AddIcon = icons.Add;
  const { showToaster } = useToaster();
  const [wards, setWards] = useState([]);
  const [openAddTeam, setOpenAddTeam] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await WardsServices.fetchAll();
      setWards(data);
    } catch (err) {
      showToaster("error", err.message);
    }
  };

  const handleAddWard = async (data) => {
    try {
      await WardsServices.add(data);
      fetchData();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  return (
    <>
      {wards.map(({ name, id, description, users }) => {
        return (
          <TeamCard
            key={id}
            name={name}
            users={users}
            description={description}
          />
        );
      })}
      <Fab
        onClick={() => setOpenAddTeam(true)}
        size="large"
        variant="extended"
        sx={(theme) => {
          return {
            position: "fixed",
            bottom: theme.spacing(3),
            right: theme.spacing(3),
            color: theme.palette.success.light,
          };
        }}
      >
        <AddIcon fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h5">Wards</Typography>
      </Fab>
      {openAddTeam && (
        <FormDialog
          open={openAddTeam}
          title="Add New Wards"
          formStructer={formStructer}
          handleSubmit={handleAddWard}
          onClose={() => setOpenAddTeam(false)}
        />
      )}
    </>
  );
};
const { Badge, Description, TeamLead } = icons;
const formStructer = [
  { size: 6, label: "Name", id: "name", icon: Badge },
  {
    type: "text",
    size: 6,
    label: "Description",
    id: "description",
    icon: Description,
    multiline: true,
  },
  {
    size: 12,
    label: "Team",
    id: "teamId",
    Icon: () => <TeamLead />,
    type: "select",
    api: TeamServices.fetchAll,
  },
  // {
  //   size: 12,
  //   label: "Wards",
  //   id: "wards",
  //   Icon: () => <TeamLead />,
  //   type: "multiselect",
  // },
];
