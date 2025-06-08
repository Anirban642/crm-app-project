import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = ({ fullPage = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: fullPage ? '100vh' : 'auto',
        width: fullPage ? '100vw' : 'auto',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default LoadingSpinner;