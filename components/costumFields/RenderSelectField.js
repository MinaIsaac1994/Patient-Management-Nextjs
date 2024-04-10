import { Field } from "formik";
import { Grid, MenuItem, TextField, InputAdornment } from "@mui/material";

const RenderSelectField = ({ id, label, Icon, list = [], size }) => (
  <Grid item xs={size}>
    <Field name={id}>
      {({ field }) => (
        <TextField
          {...field}
          select
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon />
              </InputAdornment>
            ),
          }}
          multiline={false}
          label={label}
          variant="outlined"
          fullWidth
          margin="dense"
        >
          {list?.map(({ label = "", value = "" }) => (
            <MenuItem key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </TextField>
      )}
    </Field>
  </Grid>
);

export default RenderSelectField;
