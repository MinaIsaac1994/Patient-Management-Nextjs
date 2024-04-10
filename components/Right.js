import { ColorModeContext, tokens } from "@/theme";
import {
  Box,
  CardContent,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import Topbar from "./topbar";
import TopCards from "./cards/TopCards";
import CardWrapper from "./cards/card-wrapper";
import ColumnChart from "./charts/ColumnChart";
import ApexChart from "./charts/AreaChart";
import ChartComponent from "./charts/NegationColumn";
import icons from "./icons";

const Right = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <Box className=" w-full  rounded-xl h-full px-5 overflow-y-scroll">
      <Box>
        <Topbar title="Dashboard" />
      </Box>
      <Box className=" grid grid-cols-2 md:grid-cols-4 gap-3">
        {topCardsData.map(({ Icon, title, value }) => {
          return (
            <TopCards key={title} title={title} Icon={Icon} value={value} />
          );
        })}
      </Box>
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-3 py-3 lg:h-[320px] h-auto">
        <CardWrapper>
          <ColumnChart />
        </CardWrapper>
        <CardWrapper>
          <ApexChart />
        </CardWrapper>
      </Box>

      <Box className="grid grid-cols-1 gap-3 py-3 h-[320px] ">
        <Box className=" flex items-center justify-between">
          <Typography variant="h3" fontWeight="bold">
            Take on vs Discharge
          </Typography>
          <Box className="flex items-center justify-between gap-10">
            <Typography variant="h5" fontWeight="500">
              Today
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Last Week
            </Typography>
            <Typography variant="h5" fontWeight="500">
              Month
            </Typography>
            <Typography variant="h5" fontWeight="500">
              6 Month
            </Typography>
          </Box>
        </Box>
        <CardWrapper>
          <ChartComponent />
        </CardWrapper>
      </Box>
    </Box>
  );
};

export default Right;

const topCardsData = [
  { title: "Average Opel", Icon: icons.Opel, value: 5 },
  { title: "Patients", Icon: icons.Patient, value: 86 },
  { title: "Total Contacts", Icon: icons.Contacts, value: 172 },
  { title: "Pending Referrals", Icon: icons.PendingReferral, value: 20 },
];
