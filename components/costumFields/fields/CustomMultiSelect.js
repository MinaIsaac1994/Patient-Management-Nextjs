import { useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
// import CustomTextField from "./CustomTextField";
import Checked from "@mui/icons-material/CheckBox";
import Unchecked from "@mui/icons-material/CheckBoxOutlineBlank";
import { createFilterOptions } from "@mui/material/useAutocomplete";

const icon = <Unchecked fontSize="small" />;
const checkedIcon = <Checked color="primary" fontSize="small" />;

const CustomMultiSelect = ({
  field,
  limitTags = 1,
  label,
  min = "0",
  otherFields = [],
  placeholder,
  options = [],
  setFieldValue,
  type = "text",
  size = "medium",
  required = false,
  fullWidth = true,
  margin = "normal",
  isDisabled = false,
  isMultiple = false,
  variant = "outlined",
  selectAllLabel = "Select all",
}) => {
  const filter = createFilterOptions();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const allSelected = options.length === selectedOptions.length;

  const handleToggleOption = (selectedOptions) =>
    setSelectedOptions(selectedOptions);

  const handleClearOptions = () => {
    setSelectedOptions([]);
    setFieldValue(id, "");
  };

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedOptions(options);
    } else {
      handleClearOptions();
    }
  };

  const handleToggleSelectAll = () => {
    handleSelectAll && handleSelectAll(!allSelected);
  };
  const handleChange = (event, selectedOptions, reason) => {
    console.log(selectedOptions);
    if (isMultiple) {
      if (reason === "selectOption" || reason === "removeOption") {
        if (selectedOptions.find((option) => option?.name === "selectAll")) {
          handleToggleSelectAll();
          let result = [];
          result = options.filter((el) => el.name !== "selectAll");
          return setFieldValue(id, result);
        } else {
          handleToggleOption && handleToggleOption(selectedOptions);
          return setFieldValue(id, selectedOptions);
        }
      } else if (reason === "clear") {
        handleClearOptions();
      }
    } else if (reason === "clear" && otherFields?.length) {
      otherFields.forEach((field) => setFieldValue(field, ""));
      handleClearOptions();
    } else setFieldValue(id, selectedOptions ?? "");
  };

  const optionRenderer = (props, option, { selected }) => {
    const selectAllProps =
      option.name === "selectAll" ? { checked: allSelected } : {};
    return (
      <li {...props} key={option.id ?? option}>
        {isMultiple ? (
          <Checkbox
            icon={icon}
            checked={selected}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            {...selectAllProps}
          />
        ) : (
          ""
        )}
        {option?.label ?? option}
      </li>
    );
  };

  return (
    <Autocomplete
      {...field}
      //   id={id}
      size={size}
      //   onBlur={onBlur}
      options={options}
      disabled={isDisabled}
      limitTags={limitTags}
      multiple={isMultiple}
      fullWidth={fullWidth}
      onChange={handleChange}
      disableCloseOnSelect={isMultiple}
      value={isMultiple ? selectedOptions : field.value}
      getOptionLabel={(option) =>
        option?.label ??
        options?.filter((e) => e?.id === option?.id)[0]?.label ??
        option
      }
      // isOptionEqualToValue={}
      // inspect warring for "" and check create new inbound order fetch supplier and Doc.No
      filterOptions={(options, params) => {
        const filtered = filter(options, params);
        return [
          ...(isMultiple && options.length > 1
            ? [{ label: selectAllLabel, name: "selectAll" }]
            : []),
          ...filtered,
        ];
      }}
      renderOption={optionRenderer}
      renderInput={(params) => (
        <TextField
          {...params}
          value={field.value}
          variant="outlined"
          fullWidth
          margin="dense"
          label={label}
          inputProps={{
            ...params.inputProps,
          }}
        />
        // <CustomTextField
        //   {...params}
        //   min={min}
        //   name={id}
        //   type={type}
        //   title={title}
        //   error={error}
        //   margin={margin}
        //   variant={variant}
        //   touched={touched}
        //   required={required}
        //   className={className}
        //   isDisabled={isDisabled}
        //   placeholder={placeholder}
        //   inputProps={{
        //     ...params.inputProps,
        //   }}
        // />
      )}
    />
  );
};

export default CustomMultiSelect;
