"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import Topbar from "@/components/topbar";
import { tokens, useMode } from "@/theme";
import { TeamsComponent } from "./component/teams";
import { WardsComponent } from "./component/wards";
import ToggleButtonComponent from "@/components/buttons/toggleButton";

const Explore = () => {
  const [theme, colorMode] = useMode();
  const [view, setView] = useState("Teams");
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box className=" w-full  rounded-xl h-full px-5 overflow-y-scroll">
        <Box>
          <Topbar title="Explore" />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <ToggleButtonComponent
            value={view}
            setValue={setView}
            options={["Teams", "Wards"]}
          />
        </Box>
        <Box className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {view === "Teams" && <TeamsComponent />}
          {view === "Wards" && <WardsComponent />}
        </Box>
      </Box>
    </>
  );
};

export default Explore;
