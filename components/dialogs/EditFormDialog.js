import {
  Box,
  Grid,
  Slide,
  Button,
  Dialog,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useToaster } from "@/config/Toaster";
import { useState, forwardRef, useEffect } from "react";
import useFormStructure from "@/hooks/useFormStructure";
import RenderTextField from "../costumFields/RenderTextField";
import RenderDateField from "../costumFields/RenderDateField";
import RenderOpelSlider from "../costumFields/RenderOpelSlider";
import RenderSwitchField from "../costumFields/RenderSwitchField";
import RenderSelectField from "../costumFields/RenderSelectField";
import RenderToggleButton from "../costumFields/RenderToggleButton";
import RenderMultiSelectField from "../costumFields/RenderMultiSelectField";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EditFormDialog = ({
  onClose,
  fetchApi,
  title = "",
  open = false,
  formStructer = [],
  handleSubmit = () => null,
}) => {
  const { showToaster } = useToaster();
  const [data, setData] = useState(null);
  const { fields } = useFormStructure(formStructer);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const details = await fetchApi();
        setData(details);
      } catch (error) {
        showToaster("error", error.message);
      }
    };
    handleFetch();
  }, []);

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
        {data && (
          <Formik
            enableReinitialize
            initialValues={data}
            onSubmit={async (values) => {
              try {
                await handleSubmit(values);
                onClose();
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
                      type = "text",
                      Icon = () => null,
                      multiline = false,
                    }) => {
                      if (type === "text") {
                        return (
                          <RenderTextField
                            id={id}
                            key={id}
                            size={size}
                            Icon={Icon}
                            label={label}
                            multiline={multiline}
                          />
                        );
                      }
                      if (type === "date") {
                        return (
                          <RenderDateField
                            id={id}
                            key={id}
                            Icon={Icon}
                            size={size}
                            label={label}
                            multiline={multiline}
                          />
                        );
                      }
                      if (type === "select") {
                        return (
                          <RenderSelectField
                            id={id}
                            key={id}
                            Icon={Icon}
                            list={list}
                            size={size}
                            label={label}
                          />
                        );
                      }

                      if (type === "multiselect") {
                        return (
                          <RenderMultiSelectField
                            id={id}
                            key={id}
                            list={list}
                            size={size}
                            label={label}
                            setFieldValue={setFieldValue}
                          />
                        );
                      }
                      if (type === "switch") {
                        return (
                          <RenderSwitchField
                            id={id}
                            key={id}
                            size={size}
                            label={label}
                            setFieldValue={setFieldValue}
                          />
                        );
                      }
                      if (type === "toggle") {
                        return (
                          <RenderToggleButton
                            id={id}
                            key={id}
                            size={size}
                            label={label}
                            setFieldValue={setFieldValue}
                          />
                        );
                      }
                      if (type === "slider") {
                        return (
                          <RenderOpelSlider
                            id={id}
                            key={id}
                            size={size}
                            label={label}
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
                      Edit
                    </Button>
                  </Box>
                </DialogActions>
              </Form>
            )}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};
export default EditFormDialog;
