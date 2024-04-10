import { Button, Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Image from 'next/image';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation } from 'swiper/modules';

const Carousal = () => {
	const [my_swiper, set_my_swiper] = useState({});
	const handlePrevClick = () => {
		my_swiper.slidePrev();
	};

	const handleNextClick = () => {
		my_swiper.slideNext();
	};

	return (
		<Box className="py-2">
			<Box className="flex justify-between">
				<Box display="flex" alignItems="center" borderRadius="3px">
					<Typography variant="h3" fontWeight="bold">
						Cards:1/6
					</Typography>
				</Box>
				<Box>
					<Button onClick={handlePrevClick} className="text-white ">
						<ArrowBackIosIcon />
					</Button>

					<Button onClick={handleNextClick} className="text-white">
						<ArrowForwardIosIcon />
					</Button>
				</Box>
			</Box>
			<Box className=" rounded-lg relative pt-3 ">
				<Swiper
					pagination={{
						type: 'fraction',
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					className="mySwiper"
					slidesPerView={1}
					onInit={(ev) => {
						set_my_swiper(ev);
					}}
				>
					<SwiperSlide>
						<div className=" aspect-[1.8/1] rounded-xl">
							<Image
								src="/1.jpg"
								alt="ad"
								fill
								className=" rounded-xl"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className=" aspect-[1.8/1] rounded-xl">
							<Image
								src="/1.jpg"
								alt="ad"
								fill
								className=" rounded-xl"
							/>
						</div>
					</SwiperSlide>
					<SwiperSlide>
						<div className=" aspect-[1.8/1] rounded-xl">
							<Image
								src="/1.jpg"
								alt="ad"
								fill
								className=" rounded-xl"
							/>
						</div>
					</SwiperSlide>
				</Swiper>
			</Box>
		</Box>
	);
};

export default Carousal;
