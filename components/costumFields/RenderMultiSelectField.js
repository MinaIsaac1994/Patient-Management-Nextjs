import { Field } from "formik";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Checkbox, Autocomplete, Grid, TextField } from "@mui/material";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

const RenderMultiSelectField = ({ id, label, list, size, setFieldValue }) => {
  const handleChange = (event, newValue) => {
    setFieldValue(id, newValue); // Update Formik values with the new selected values
  };

  return (
    <Grid item xs={size}>
      <Field name={id}>
        {({ field }) => (
          <>
            <Autocomplete
              multiple
              onChange={handleChange}
              options={list}
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={field.value}
                  variant="outlined"
                  fullWidth
                  margin="dense"
                  label={label}
                />
              )}
            />
          </>
        )}
      </Field>
    </Grid>
  );
};
export default RenderMultiSelectField;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
