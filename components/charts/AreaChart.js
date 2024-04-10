"use client";
import React from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
// import ReactApexChart from 'react-apexcharts';
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ApexChart = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const state = {
    series: [
      {
        name: "series1",
        data: [10, 40, 28, 51, 42, 30, 40],
        color: "#348263",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: false,
      },

      grid: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
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
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  };

  return (
    <>
      <Box className=" px-5 pt-4 ">
        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
          Demand - Forcast
        </Typography>
        <Typography variant="h2" component="div" sx={{ fontWeight: "bold" }}>
          77
        </Typography>
        <Typography color="text.secondary">
          <span className=" text-green-600 mr-1">
            <TrendingDownIcon sx={{ mr: 0.5 }} /> 5%
          </span>
          Yesterday
        </Typography>
      </Box>
      <div id="chart" className=" w-full">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          width={"100%"}
          height={"200"}
        />
      </div>
    </>
  );
};

export default ApexChart;
