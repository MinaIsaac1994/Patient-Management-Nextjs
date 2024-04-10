import { Field } from "formik";
import { Grid, TextField, InputAdornment } from "@mui/material";

const RenderTextField = ({ id, label, Icon, multiline, size }) => (
  <Grid item xs={size}>
    <Field name={id}>
      {({ field }) => (
        <TextField
          {...field}
          fullWidth
          label={label}
          margin="dense"
          variant="outlined"
          multiline={multiline}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ),
          }}
        />
      )}
    </Field>
  </Grid>
);

export default RenderTextField;
