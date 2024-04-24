import { ColorModeContext, tokens, useMode } from "@/theme";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useContext } from "react";
import Backlog from "./Backlog";
import CardWrapper from "./cards/card-wrapper";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Carousal from "./carousal";

const Left = () => {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className=" w-full  rounded-xl h-full p-4 overflow-y-scroll">
      {/* <Carousal /> */}

      <Box className="flex items-center justify-between py-5">
        <Button
          sx={{
            padding: "15px",
            paddingX: "20px",
            borderRadius: "15px",
            color: "gray",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: "600",
          }}
        >
          <TrendingDownIcon />
          <Typography variant="span">Send</Typography>
        </Button>
        <Button
          sx={{
            padding: "15px",
            paddingX: "20px",
            borderRadius: "15px",
            color: "gray",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            fontWeight: "600",
          }}
        >
          <TrendingUpIcon />
          <Typography variant="span">Receive</Typography>
        </Button>
      </Box>
      <CardWrapper>
        <Box
          className="p-5"
          sx={{
            bgcolor: colors.bg2,
          }}
        >
          <Typography variant="h5" fontWeight="bold">
            Todays Highlights
          </Typography>
          <Typography variant="span" fontWeight="500" color="gray">
            Lorem ipsum dolor sit amet consectetur
          </Typography>
        </Box>
      </CardWrapper>
      <Backlog />
    </Box>
  );
};

export default Left;
