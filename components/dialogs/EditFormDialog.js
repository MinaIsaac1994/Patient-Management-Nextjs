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
import { forwardRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { useToaster } from "@/config/Toaster";
import useFormStructure from "@/hooks/useFormStructure";
import { convertArrayToObject } from "@/utils/functions";
import RenderTextField from "../costumFields/RenderTextField";
import RenderSelectField from "../costumFields/RenderSelectField";
import RenderMultiSelectField from "../costumFields/RenderMultiSelectField";
import { useState } from "react";
import RenderSwitchField from "../costumFields/RenderSwitchField";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const teamLeaders = [
  { value: "leader1", label: "Leader 1" },
  { value: "leader2", label: "Leader 2" },
  { value: "leader3", label: "Leader 3" },
];
const EditFormDialog = ({
  id,
  onClose,
  fetchApi,
  title = "",
  open = false,
  formStructer = [],
  handleSubmit = () => null,
}) => {
  const { showToaster } = useToaster();
  const { fields } = useFormStructure(formStructer);
  const [data, setData] = useState(null);
  useEffect(() => {
    const handleFetch = async () => {
      try {
        const details = await fetchApi(id);
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
                      list,
                      label,
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
                            size={size}
                            label={label}
                            list={teamLeaders}
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
