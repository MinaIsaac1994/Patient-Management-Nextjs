import { useContext } from "react";
import Box from "@mui/material/Box";
import { ColorModeContext, tokens } from "@/theme";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, useTheme } from "@mui/material";
import CardWrapper from "@/components/cards/card-wrapper";
import ReactApexChart from "react-apexcharts";

export default function OpelCard({ Icon, title, details, value = 0 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const data = {
    series: [
      {
        name: "Opel 4",
        data: [44],
      },
      {
        name: "Opel 3",
        data: [53],
      },
      {
        name: "Opel 2",
        data: [12],
      },
      {
        name: "Opel 1",
        data: [9],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
        type: "bar",
        stacked: true,
      },
      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
        total: {
          show: false,
          enabled: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: true,
          borderRadius: 10,
          borderRadiusApplication: "around",
          borderRadiusWhenStacked: "all",
          dataLabels: {
            total: {
              enabled: false,
            },
          },
        },
      },

      xaxis: {
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
      yaxis: {
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
      tooltip: {
        enabled: false,
      },

      legend: {
        show: false,
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
              display: "flex",
              justifyContent: "stretch",
              alignItems: "center",
            }}
          >
            <Box>
              <ReactApexChart
                options={data.options}
                series={data.series}
                type="bar"
                height={100}
                width={320}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
}
