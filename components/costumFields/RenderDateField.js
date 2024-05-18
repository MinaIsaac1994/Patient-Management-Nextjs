import { Field } from "formik";
import { Grid, TextField, InputAdornment } from "@mui/material";

const RenderTextField = ({ id, label, Icon, multiline, size }) => (
  <Grid item xs={size}>
    <Field name={id}>
      {({ field }) => (
        <TextField
          type="date"
          {...field}
          fullWidth
          margin="dense"
          variant="outlined"
        />
      )}
    </Field>
  </Grid>
);

export default RenderTextField;
