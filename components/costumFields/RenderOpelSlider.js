import { Field } from "formik";
import { Grid, Slider } from "@mui/material";

const RenderOpelSlider = ({ id, label, size }) => (
  <Grid item xs={size} sx={{ mx: 5 }}>
    <Field name={id}>
      {({ field }) => (
        <Slider
          {...field}
          step={1}
          min={1}
          max={4}
          marks={marks}
          // value={value}
          // onChange={onChange}
        />
      )}
    </Field>
  </Grid>
);

export default RenderOpelSlider;
const marks = [
  {
    value: 1,
    label: "Opel 1",
  },
  {
    value: 2,
    label: "Opel 2",
  },
  {
    value: 3,
    label: "Opel 3",
  },
  {
    value: 4,
    label: "Opel 4",
  },
];
