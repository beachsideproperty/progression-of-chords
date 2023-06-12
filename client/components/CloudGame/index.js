import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import videoClouds from '../../cloudVideo.mp4';
import Wrapper from '../style.js';

const CloudGame = () => {
  const user = useSelector((state) => state.auth.user);
  const containerRef = useRef(null);

  useEffect(() => {
    const iframe = document.createElement('iframe');
    iframe.src = 'http://localhost:3000/game/index.html';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.border = 'none';

    const container = containerRef.current;
    container.appendChild(iframe);

    iframe.addEventListener('load', () => {
      const gameWindow = iframe.contentWindow;
      const gameDoc = gameWindow.document;

      const gameCanvas = gameDoc.querySelector('canvas');
      gameCanvas.style.position = 'absolute';
      gameCanvas.style.top = 0;
      gameCanvas.style.left = 0;
      gameCanvas.style.width = '100%';
      gameCanvas.style.height = '100%';
      gameCanvas.style.margin = 0;
      gameCanvas.style.padding = 0;
    });

    return () => {
      container.removeChild(iframe);
    };
  }, []);

  return (
    <Wrapper videoSrc={videoClouds}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            width: '70vw',
            aspectRatio: '16 / 9',
            border: '2px solid pink',
            boxSizing: 'border-box',
          }}
        ></Box>
      </Box>
    </Wrapper>
  );
};

export default CloudGame;
