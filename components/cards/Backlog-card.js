import { ColorModeContext, tokens } from "@/theme";
import { Home } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

const BacklogCard = ({ name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box className=" flex justify-between items-center">
      <Box className=" flex  items-center gap-3">
        <IconButton
          sx={{
            padding: "15px",
            borderRadius: "15px",
            backgroundColor: colors.bg3,
          }}
        >
          <Home fontSize="30px" />
        </IconButton>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Michael S
          </Typography>
          <Typography variant="span" color={"gray"}>
            Sapphire Ward (Front Door)
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="h6">Pending AV</Typography>
      </Box>
    </Box>
  );
};

export default BacklogCard;
