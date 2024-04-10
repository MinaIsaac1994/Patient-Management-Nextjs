import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Typography } from '@mui/material';
const ReactApexChart = dynamic(() => import('react-apexcharts'), {
	ssr: false,
});

const NegationColumn = () => {
	const [mounted, setMounted] = useState(false);
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;
	const state = {
		series: [
			{
				name: 'series1',
				data: [31, 40, 28, 51, 42, 109, 100],
			},
			{
				name: 'series2',
				data: [11, 32, 45, 32, 34, 52, 41],
			},
		],
		options: {
			chart: {
				height: 350,
				type: 'area',
				toolbar: false,
			},

			grid: {
				show: false,
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
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
					format: 'dd/MM/yy HH:mm',
				},
			},
		},
	};

	return (
		<>
			<div id="chart" className=" w-full">
				{/* {typeof window !== 'undefined' && ( */}
					<>
						<ReactApexChart
							options={state.options}
							series={state.series}
							type="area"
							width={'100%'}
							height={'300'}
						/>
						{/* <div id="html-dist"></div> */}
					</>
				{/* )} */}
			</div>
		</>
	);
};

export default NegationColumn;
