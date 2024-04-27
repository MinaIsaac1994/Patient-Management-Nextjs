import { useContext } from "react";
import Box from "@mui/material/Box";
import { ColorModeContext, tokens } from "@/theme";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, IconButton, useTheme } from "@mui/material";
import CardWrapper from "@/components/cards/card-wrapper";
import ReactApexChart from "react-apexcharts";

export default function ReferralCard({ Icon, title, details, value = 0 }) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const data = {
    series: [67, 84, 50],
    options: {
      plotOptions: {
        radialBar: {
          track: {
            show: true,
            startAngle: undefined,
            endAngle: undefined,
            background: "#c0c0c0",
            strokeWidth: "10%",
            opacity: 0,
            margin: 5,
            dropShadow: {
              enabled: true,
              top: 0,
              left: 0,
              blur: 3,
              opacity: 0.5,
            },
          },
          hollow: {
            // margin: 5,
            size: "40%",
          },

          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -5,
              show: true,
              color: "#a4a4a4",
              fontSize: "12px",
            },
            value: {
              offsetY: -5,
              color: "#dbdbdb",
              fontSize: "16px",
              show: true,
            },
          },
        },
      },

      stroke: {
        lineCap: "round",
      },

      labels: ["Pending", "Sent", "Accepted"],

      legend: {
        show: false,
      },
      chart: {
        height: "100",
        toolbar: {
          show: false,
        },

        type: "radialBar",
        dropShadow: {
          enabled: false,
        },
      },

      stroke: {
        lineCap: "round",
      },
      fill: {
        opacity: 0.7,
      },
      markers: {
        size: 0,
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
              height: 180,
              position: "relative",
              top: "5px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box>
              <ReactApexChart
                options={data.options}
                series={data.series}
                type="radialBar"
                height={220}
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </CardWrapper>
  );
}
