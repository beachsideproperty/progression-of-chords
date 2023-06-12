import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import HamburgerMenu from './HamburgerMenu.js';

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpen(!open);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: 'transparent',
          zIndex: 1,
          boxShadow: 'none',
        }}
        elevation={0}
      >
        <Toolbar>
          <HamburgerMenu toggleDrawer={toggleDrawer} />
          <Typography
            variant='h6'
            onClick={() => navigate('/')}
            sx={{ flexGrow: 1 }}
          >
            progression of chords
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
