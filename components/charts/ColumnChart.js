"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ColumnChart = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [chartData] = useState({
    series: [
      {
        name: "UTST",
        data: [2.3, 3.1, 4.0, 5.1, 4.0, 3.6, 3.2],
        color: "#0073c0",
      },
      {
        name: "UTRX",
        data: [1, 2.1, 3.0, 3.1, 1.0, 2, 1.2],
        color: "#005a8d",
      },
    ],
    options: {
      chart: {
        height: 200,
        type: "bar",
        stacked: true,
        toolbar: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      fill: {
        // colors: ['#ace7b19b'],
      },
      grid: {
        show: false,
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "50%",
          dataLabels: {
            position: "top",
            total: {
              enabled: true,
              style: {
                fontSize: "14px",
                color: "#93b1c26c",
              },
            },
          },
        },
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -15,
      },
      xaxis: {
        show: true,
        categories: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Sunday",
          "Saturday",
        ],
        position: "bottom",
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },

        tooltip: {
          enabled: false,
        },
        crosshairs: {
          show: false,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          // formatter: function (val) {
          // 	return val;
          // },
        },
      },
    },
  });
  if (!mounted) return null;
  return (
    <>
      <Box className=" px-5 pt-4">
        <Typography sx={{ fontSize: 15 }} color="text.secondary" gutterBottom>
          Unattended patients
        </Typography>
        <Typography variant="h2" component="div" sx={{ fontWeight: "bold" }}>
          90
        </Typography>
        <Typography color="text.secondary">
          <span className=" text-red-600 px-1">
            <TrendingUpIcon sx={{ mr: 0.5 }} />
            11.2%
          </span>
          Yesterday
        </Typography>
      </Box>
      <div id="chart">
        <ReactApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={"200"}
          width={"100%"}
        />
      </div>
    </>
  );
};

export default ColumnChart;
