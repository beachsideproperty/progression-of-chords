import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import {
  SkipPrevious as SkipPreviousIcon,
  PlayArrow as PlayArrowIcon,
  Pause as PauseIcon,
  SkipNext as SkipNextIcon,
} from '@mui/icons-material';
import blonde from '../../blonde.png';
import pink from '../../pink_white.mp3';

const MusicCard = () => {
  const [audio] = useState(new Audio(pink));
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  const createIconButton = (label, handleClick, icon) => (
    <IconButton aria-label={label} onClick={handleClick}>
      {icon}
    </IconButton>
  );

  const createTypography = (variant, color, component, text) => (
    <Typography variant={variant} color={color} component={component}>
      {text}
    </Typography>
  );

  return (
    <Card sx={{ display: 'flex', flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          {createTypography('h5', null, 'div', 'Pink + White')}
          {createTypography(
            'subtitle1',
            'text.secondary',
            'div',
            'Frank Ocean'
          )}
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
            {createIconButton('previous', null, <SkipPreviousIcon />)}
            {createIconButton(
              'play/pause',
              handlePlayPause,
              isPlaying ? (
                <PauseIcon sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrowIcon sx={{ height: 38, width: 38 }} />
              )
            )}
            {createIconButton('next', null, <SkipNextIcon />)}
          </Box>
        </CardContent>
      </Box>
      <CardMedia
        component='img'
        sx={{ width: 151 }}
        image={blonde}
        alt='Frank Ocean - Blonde'
      />
    </Card>
  );
};

export { MusicCard };
