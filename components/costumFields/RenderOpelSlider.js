import { Box, Grid, Slider } from "@mui/material";
import { Field } from "formik";

const OpelSlider = ({ onChange, value }) => (
  <Grid item xs={size}>
    <Field name={id}>
      {({ field }) => (
        <Slider
          {...field}
          step={1}
          min={1}
          max={4}
          marks={marks}
          id="opel"
          value={value}
          onChange={onChange}
          name="opel"
        />
      )}
    </Field>
  </Grid>
);

export default OpelSlider;
