import { Chip, Typography } from "@mui/material";
export const Opel = ({ opel }) => (
  <Chip
    // icon={<HourglassBottomRoundedIcon />}
    label={<Typography sx={{ fontWeight: 600 }}>{opel}</Typography>}
    color={colors[opel]}
    sx={{ px: 2 }}
  />
);

const colors = {
  1: "default",
  2: "success",
  3: "warning",
  4: "error",
};
