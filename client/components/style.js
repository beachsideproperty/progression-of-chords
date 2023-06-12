import React from 'react';
import { Box } from '@mui/material';

const Wrapper = ({ children, videoSrc }) => (
  <Box
    sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
    }}
  >
    <Box
      component='video'
      autoPlay
      loop
      muted
      src={videoSrc}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100%',
        height: '100%',
        transform: 'translate(-50%, -50%)',
        objectFit: 'cover',
        zIndex: -1,
      }}
    />
    {children}
  </Box>
);

export default Wrapper;
