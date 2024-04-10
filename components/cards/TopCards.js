import { useContext } from "react";
import Box from "@mui/material/Box";
import CardWrapper from "./card-wrapper";
import { ColorModeContext, tokens } from "@/theme";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { IconButton, useTheme } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function TopCards({ Icon, title, details, value = 0 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  return (
    <CardWrapper borderRadius={"30px"}>
      <CardContent>
        <IconButton
          color={colors.bg3}
          sx={{
            padding: "15px",
            borderRadius: "15px",
            backgroundColor: colors.bg3,
          }}
        >
          <Icon fontSize="large" />
        </IconButton>
        <Typography
          sx={{ fontSize: 16, padding: "10px 0 0 0" }}
          color="text.secondary"
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="h3"
          component="div"
          sx={{ padding: "10px 0 5px 0", fontWeight: "bold" }}
        >
          {value}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          <span className=" text-red-600"> 11.2% </span>per year
        </Typography>
      </CardContent>
    </CardWrapper>
  );
}
