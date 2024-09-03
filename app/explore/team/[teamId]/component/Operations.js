import CustomTable from "@/components/Table";
import CustomTabPanel from "@/components/CustomTabPanel";
import PatientDetailPanel from "@/components/detailPanels/patientDetailPanel";
import TabsOperations from "./TabsOperations";
import { Grid } from "@mui/material";
import { useState } from "react";
import useTherapistsColumns from "@/config/columns/useTherapistsColumns";
const Operations = ({ patients, therapists }) => {
  const [tabValue, setTabValue] = useState(0);
  const [therapistSkeleton] = useTherapistsColumns();
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <TabsOperations tabValue={tabValue} handleTabChange={handleTabChange} />
      <Grid item xs={12} sx={{ mx: 1 }}>
        <CustomTabPanel value={tabValue} index={0}>
          <CustomTable
            data={patients?.patientsData ?? []}
            grouping={["wards"]}
            columns={patients.patientsColumns}
            detailPanel={({ row }) => (
              <PatientDetailPanel row={row.original?.detailPanel} />
            )}
            rowActions={
              [
                //   {
                //     icon: "Edit",
                //     name: "Edit",
                //     onClick: handleEditClick,
                //   },
                //   {
                //     icon: "Delete",
                //     name: "Delete",
                //     onClick: removePatient,
                //   },
              ]
            }
          />
        </CustomTabPanel>
        <CustomTabPanel value={tabValue} index={3}>
          <CustomTable
            data={therapists}
            grouping={["wards"]}
            columns={therapistSkeleton}
            // detailPanel={({ row }) => (
            //   <patientDetailPanel row={row.original?.detailPanel} />
            // )}
            rowActions={
              [
                //   {
                //     icon: "Edit",
                //     name: "Edit",
                //     onClick: handleEditClick,
                //   },
                //   {
                //     icon: "Delete",
                //     name: "Delete",
                //     onClick: removePatient,
                //   },
              ]
            }
          />
        </CustomTabPanel>
      </Grid>
    </>
  );
};

export default Operations;
