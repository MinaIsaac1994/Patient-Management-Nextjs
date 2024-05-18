import { useContext } from "react";
import Box from "@mui/material/Box";
import { ColorModeContext, tokens } from "@/theme";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, useTheme } from "@mui/material";
import CardWrapper from "@/components/cards/card-wrapper";
import ReactApexChart from "react-apexcharts";

export default function ContactsCard({ Icon, title, details, value = 0 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const data = {
    series: [
      {
        name: "Patients",
        data: [10, 9, 30],
      },
      {
        name: "Therapist",
        data: [20, 30, 40],
      },
    ],
    options: {
      dataLabels: {
        enabled: false,
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      chart: {
        height: "10%",
        toolbar: {
          show: false,
        },

        type: "radar",
        dropShadow: {
          enabled: false,
        },
      },

      stroke: {
        width: 2,
      },
      fill: {
        opacity: 0.1,
      },
      markers: {
        size: 0,
      },
      tooltip: {
        enabled: false,
      },
      yaxis: {
        stepSize: 50,
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      xaxis: {
        categories: ["N/A", "OT", "PT"],
        show: false,
        labels: {
          show: true,
        },
        axisBorder: {
          show: false,
        },
      },
    },
  };
  return (
    <CardWrapper borderRadius={"30px"}>
      <CardContent sx={{ height: "auto" }}>
        <Grid container>
          <Grid item xs={3}>
            <IconButton
              color={colors.bg3}
              sx={{
                padding: "15px",
                borderRadius: "15px",
                backgroundColor: colors.bg3,
              }}
            >
              <Icon fontSize="large" />
            </IconButton>
            <Typography
              sx={{ fontSize: 16, padding: "10px 0 0 0" }}
              color="text.secondary"
              gutterBottom
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              component="div"
              sx={{ padding: "10px 0 5px 0", fontWeight: "bold" }}
            >
              {value}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              <span className=" text-red-600"> 11.2% </span>per year
            </Typography>
          </Grid>
          <Grid
            item
            xs={9}
            sx={{
              height: 180,
              position: "relative",
              top: "40px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box>
              <ReactApexChart
                options={data.options}
                series={data.series}
                type="radar"
                height={240}
                width={"100%"}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
}
