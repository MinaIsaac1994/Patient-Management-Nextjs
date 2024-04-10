import { tokens, useMode } from '@/theme';
import { Card } from '@mui/material';
import React from 'react';

const CardWrapper = ({borderRadius='20px', children }) => {
	const [theme, colorMode] = useMode();
	const colors = tokens(theme.palette.mode);
	return (
		<Card
			sx={{
				borderRadius: borderRadius,
				// padding: '10px',
				// backgroundColor: colors.bgNav,
			}}
		>
			{children}
		</Card>
	);
};

export default CardWrapper;

