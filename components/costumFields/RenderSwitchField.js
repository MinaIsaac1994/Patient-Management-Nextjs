import { Field } from "formik";
import { Grid, Box, Switch, Typography } from "@mui/material";

const RenderSwitchField = ({ id, label, size, setFieldValue }) => (
  <Grid item xs={size}>
    <Field name={id}>
      {({ field }) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Switch
            {...field}
            onChange={(e) => setFieldValue(id, e.target.checked)}
            checked={field.value}
          />
          <Typography fontSize="16px"> {label}</Typography>
        </Box>
      )}
    </Field>
  </Grid>
);

export default RenderSwitchField;
