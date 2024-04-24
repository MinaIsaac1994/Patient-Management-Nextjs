"use client";

import { useToaster } from "@/config/Toaster";
import { TeamServices } from "@/services/teams";
import { Box, Card } from "@mui/material";
import { useEffect, useState } from "react";
import TopCards from "./component/TopCards";
import Topbar from "@/components/topbar";

const TeamPage = ({ params }) => {
  const { showToaster } = useToaster();
  const [team, setTeam] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await TeamServices.fetchById(params.teamId);
        setTeam(data);
      } catch (error) {
        showToaster("error", err.message);
      }
    };
    fetchData();
  }, []);
  console.log(team);
  return (
    <Box className="w-full h-full px-4 overflow-y-scroll">
      <Box>
        <Topbar title={team?.name + " Team"} />
      </Box>
      <TopCards />
    </Box>
  );
};

export default TeamPage;
