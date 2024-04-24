import { ColorModeContext, tokens } from "@/theme";
import { Box, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";

import OpelCard from "./OpelCard";
import icons from "@/components/icons";
import PatientsCard from "./PatientsCard";
import ContactsCard from "./ContactsCard";

const TopCards = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    // <Box className=" w-full  rounded-xl h-full px-4 overflow-y-scroll">

    <Box className=" grid grid-cols-2 md:grid-cols-4 gap-3">
      <OpelCard title="Average Opel" Icon={icons.Opel} value={5} />
      <PatientsCard title="Patients" Icon={icons.Patient} value={26} />
      <ContactsCard title="Total Contacts" Icon={icons.Contacts} value={172} />
    </Box>

    // </Box>
  );
};

export default TopCards;

const topCardsData = [
  { title: "Pending Referrals", Icon: icons.PendingReferral, value: 20 },
];
