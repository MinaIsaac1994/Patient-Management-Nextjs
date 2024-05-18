import { Field } from "formik";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";

const RenderToggleButton = ({ id, label, size }) => (
  <Grid item xs={size}>
    <Field name={id}>
      {({ field }) => (
        <ToggleButtonGroup
          {...field}
          fullWidth
          exclusive
          size="large"
          id={id}
          name={label}
        >
          <ToggleButton name="specificity" value="pt" color="primary">
            PT
          </ToggleButton>
          <ToggleButton name="specificity" value="ot" color="success">
            OT
          </ToggleButton>
        </ToggleButtonGroup>
      )}
    </Field>
  </Grid>
);

export default RenderToggleButton;
