import icons from "@/components/icons";
import { useEffect, useState } from "react";
import { useToaster } from "@/config/Toaster";
import { TeamServices } from "@/services/teams";
import { Fab, Typography } from "@mui/material";
import TeamCard from "@/components/cards/TeamCard";
import FormDialog from "@/components/dialogs/FormDialog";
import { TherapistServices } from "@/services/therapist";
import { WardsServices } from "@/services/wards";

export const TeamsComponent = ({}) => {
  const AddIcon = icons.Add;
  const { showToaster } = useToaster();
  const [teams, setTeams] = useState([]);
  const [openAddTeam, setOpenAddTeam] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await TeamServices.fetchAll();
      setTeams(data);
    } catch (err) {
      showToaster("error", err.message);
    }
  };

  const handleAddTeam = async (data) => {
    try {
      await TeamServices.add(data);
      fetchData();
    } catch (err) {
      showToaster("error", err.message);
    }
  };
  return (
    <>
      {teams.map(({ name, id, description, users }) => {
        return (
          <TeamCard
            id={id}
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
        <Typography variant="h5">Team</Typography>
      </Fab>
      {openAddTeam && (
        <FormDialog
          open={openAddTeam}
          title="Add New Team"
          formStructer={formStructer}
          handleSubmit={handleAddTeam}
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
    label: "Members",
    id: "usersId",
    Icon: () => <TeamLead />,
    type: "multiselect",
    optionLabel: "speciality",
    api: TherapistServices.fetchAll,
  },
  {
    size: 12,
    label: "Wards",
    id: "wardsId",
    Icon: () => <TeamLead />,
    type: "multiselect",
    api: WardsServices.fetchAll,
  },
];
