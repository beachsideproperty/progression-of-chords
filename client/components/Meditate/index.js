import React from 'react';
import Box from '@mui/material/Box';
import Timer from './Timer';
import Wrapper from '../style.js';
import videoMeditate from '../../snow_meditate.mp4';

const Meditate = () => {
  return (
    <Wrapper videoSrc={videoMeditate}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Timer initialMinute={0} initialSeconds={10} />
      </Box>
    </Wrapper>
  );
};

export default Meditate;
