import icons from "./icons";
import { Box, Typography } from "@mui/material";
import BacklogCard from "./cards/Backlog-card";

const Backlog = () => {
  const { Wait: WaitIcon } = icons;
  return (
    <Box paddingTop={2}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        borderRadius="3px"
      >
        <Typography variant="h3" fontWeight="bold">
          Backlog
        </Typography>
        <Box
          sx={{
            padding: "10px",
          }}
        >
          <WaitIcon />
        </Box>
      </Box>
      <Box className=" flex flex-col gap-3 pt-3 ">
        <BacklogCard />
        <BacklogCard />
        <BacklogCard />
        <BacklogCard />
      </Box>
    </Box>
  );
};

export default Backlog;
