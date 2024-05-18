import {
  Box,
  Grid,
  Slide,
  Button,
  Switch,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
} from "@mui/material";
import { forwardRef } from "react";
import { Formik, Form, Field } from "formik";
import { useToaster } from "@/config/Toaster";
import useFormStructure from "@/hooks/useFormStructure";
import { convertArrayToObject } from "@/utils/functions";
import RenderTextField from "../costumFields/RenderTextField";
import RenderSelectField from "../costumFields/RenderSelectField";
import RenderMultiSelectField from "../costumFields/RenderMultiSelectField";
import RenderSwitchField from "../costumFields/RenderSwitchField";
import RenderDateField from "../costumFields/RenderDateField";
import RenderToggleButton from "../costumFields/RenderToggleButton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FormDialog = ({
  onClose,
  title = "",
  open = false,
  formStructer = [],
  handleSubmit = () => null,
}) => {
  const { showToaster } = useToaster();
  const { fields } = useFormStructure(formStructer);
  console.log(convertArrayToObject(fields));
  return (
    <Dialog
      fullWidth
      open={open}
      keepMounted
      scroll="paper"
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <DialogTitle>
        <Typography variant="h4">{title}</Typography>
      </DialogTitle>
      <DialogContent dividers={"paper"}>
        <Formik
          enableReinitialize
          initialValues={convertArrayToObject(fields)}
          onSubmit={async (values) => {
            try {
              await handleSubmit(values);
              onClose();
              // console.log(values);
            } catch (err) {
              showToaster("error", err.message);
            }
          }}
        >
          {({ handleSubmit, setFieldValue }) => (
            <Form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {fields?.map(
                  ({
                    id,
                    label,
                    list = [],
                    size = 12,
                    multiline,
                    type = "text",
                    Icon = () => null,
                  }) => {
                    if (type === "text") {
                      return (
                        <RenderTextField
                          key={id}
                          id={id}
                          label={label}
                          Icon={Icon}
                          multiline={multiline}
                          size={size}
                        />
                      );
                    }
                    if (type === "date") {
                      return (
                        <RenderDateField
                          key={id}
                          id={id}
                          label={label}
                          Icon={Icon}
                          multiline={multiline}
                          size={size}
                        />
                      );
                    }
                    if (type === "select") {
                      return (
                        <RenderSelectField
                          key={id}
                          id={id}
                          label={label}
                          Icon={Icon}
                          list={list}
                          size={size}
                        />
                      );
                    }

                    if (type === "multiselect") {
                      return (
                        <RenderMultiSelectField
                          key={id}
                          id={id}
                          label={label}
                          list={list}
                          size={size}
                          setFieldValue={setFieldValue}
                        />
                      );
                    }
                    if (type === "switch") {
                      return (
                        <RenderSwitchField
                          key={id}
                          id={id}
                          label={label}
                          size={size}
                          setFieldValue={setFieldValue}
                        />
                      );
                    }
                    if (type === "toggle") {
                      return (
                        <RenderToggleButton
                          key={id}
                          id={id}
                          label={label}
                          size={size}
                          setFieldValue={setFieldValue}
                        />
                      );
                    }
                  }
                )}
              </Grid>
              <DialogActions>
                <Box
                  sx={{
                    p: 1,
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    sx={{ mx: 3 }}
                    size="large"
                    color="error"
                    variant="outlined"
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="large"
                    type="submit"
                    color="primary"
                    variant="contained"
                  >
                    Create
                  </Button>
                </Box>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
export default FormDialog;
