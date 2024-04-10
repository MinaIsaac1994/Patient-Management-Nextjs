import { useState } from "react";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ToggleButtonComponent = ({ value, setValue, options = ["option 1"] }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ToggleButtonGroup
      color="info"
      value={value}
      exclusive
      onChange={handleChange}
      sx={{ my: 2, mx: 3 }}
    >
      {options.map((op) => (
        <ToggleButton
          sx={{ width: "155px", borderRadius: "18px" }}
          key={op}
          value={op}
        >
          <Typography>{op}</Typography>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};
export default ToggleButtonComponent;
