import { useContext } from "react";
import Box from "@mui/material/Box";
import { ColorModeContext, tokens } from "@/theme";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, useTheme } from "@mui/material";
import CardWrapper from "@/components/cards/card-wrapper";
import ReactApexChart from "react-apexcharts";

export default function PatientsCard({ Icon, title, details, value = 0 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const data = {
    series: [
      {
        data: [
          {
            x: "Harvey",
            y: 18,
          },
          {
            x: "Pembroke",
            y: 10,
          },
          {
            x: "Ocelot",
            y: 4,
          },
        ],
      },
    ],
    options: {
      dataLabels: {
        enabled: true,
      },
      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      chart: {
        toolbar: {
          show: false,
        },
        type: "treemap",
      },
      plotOptions: {
        treemap: {
          borderRadius: 12,
          useFillColorAsStroke: true,
          borderRadiusApplication: "end",

          dataLabels: {
            format: "truncate",
            total: {
              enabled: false,
            },
          },
          // colorScale: {
          //   ranges: [
          //     {
          //       from: 0.001,
          //       to: 6,
          //       color: "#084975",
          //     },
          //     {
          //       from: -6,
          //       to: 0,
          //       color: "#ea080f",
          //     },
          //   ],
          // },
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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <ReactApexChart
                options={data.options}
                series={data.series}
                type="treemap"
                height={110}
                width={300}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
}
