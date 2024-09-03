import icons from "@/components/icons";

const { Grid, Box, Tabs, Tab } = require("@mui/material");

const TabsOperations = ({ tabValue, handleTabChange }) => {
  const { Pending, Visit, CaseLoad, TeamLead } = icons;
  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "30%",
          bgcolor: "background.paper",
          borderRadius: "30px",
        }}
      >
        <Tabs value={tabValue} onChange={handleTabChange} centered>
          <Tab icon={<CaseLoad />} label="Caseload" />
          <Tab icon={<Visit />} label="Visits" />
          <Tab icon={<Pending />} label="Pending" />
          <Tab icon={<TeamLead />} label="Therapists" />
        </Tabs>
      </Box>
    </Grid>
  );
};

export default TabsOperations;
