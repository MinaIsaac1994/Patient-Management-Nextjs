import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import {
  HomeRounded,
  InfoRounded,
  AccessibilityRounded,
  HealthAndSafetyRounded,
  TurnedInRounded,
} from "@mui/icons-material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#b8b8b84b",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.action.focusOpacity,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const DetailPanel = ({ row }) => {
  console.log({ row });
  const { address, specificity, details, area, diagnosis } = row;
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item>
            <HomeRounded sx={{ mx: 1 }} />
            {address} - {area}
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <HealthAndSafetyRounded sx={{ mx: 1 }} />
            {diagnosis}
          </Item>
        </Grid>
        <Grid item xs={6}>
          {specificity === "pt" ? (
            <Item
              sx={(theme) => ({
                bgcolor: "#0039796b",
              })}
            >
              <AccessibilityRounded sx={{ mx: 1 }} />
              Physio Specific
            </Item>
          ) : specificity === "ot" ? (
            <Item
              sx={(theme) => ({
                bgcolor: "#0a75005b",
              })}
            >
              <AccessibilityRounded sx={{ mx: 1 }} />
              OT Specific
            </Item>
          ) : (
            <Item
              sx={(theme) => ({
                bgcolor: "#6e6e6e5b",
              })}
            >
              <AccessibilityRounded sx={{ mx: 1 }} />
              Nonspecific
            </Item>
          )}
        </Grid>
        <Grid item xs={6}>
          <Item>
            <InfoRounded sx={{ mx: 1 }} />
            {details}
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <TurnedInRounded color="error" sx={{ mx: 1 }} />
            Plan
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
export default DetailPanel;
