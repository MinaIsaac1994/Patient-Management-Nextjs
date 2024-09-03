import { useContext } from "react";
import OpelCard from "./OpelCard";
import icons from "@/components/icons";
import PatientsCard from "./PatientsCard";
import ContactsCard from "./ContactsCard";
import ReferralCard from "./ReferralCard";
import { Box, useTheme } from "@mui/material";
import { ColorModeContext, tokens } from "@/theme";

const TopCards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box className=" grid grid-cols-2 md:grid-cols-4 gap-3">
      <OpelCard title="Opel" Icon={icons.Opel} value={4} />
      <ContactsCard title="Contacts" Icon={icons.Contacts} value={100} />
      <PatientsCard title="Patients" Icon={icons.Patient} value={26} />
      <ReferralCard title="Referrals" Icon={icons.PendingReferral} value={20} />
    </Box>
  );
};

export default TopCards;
