import React, { useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store';
import { removeUserToken } from '../../utils';

//drawer elements used
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import SportsCricketIcon from '@mui/icons-material/SportsCricket';
import AppsIcon from '@mui/icons-material/Apps';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CreateIcon from '@mui/icons-material/Create';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';

const StyledHamburgerMenu = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
}));

const StyledSearch = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.primary.main, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//search as JSX
const search = (
  <StyledSearch>
    <SearchIconWrapper>
      <SearchIcon />
    </SearchIconWrapper>
    <StyledInputBase
      placeholder='Search...'
      inputProps={{ 'aria-label': 'search' }}
    />
  </StyledSearch>
);

export default function HamburgerMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
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

  const closeDrawer = () => {
    setOpen(false);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <StyledHamburgerMenu>
      <IconButton
        edge='start'
        color='inherit'
        aria-label='open drawer'
        onClick={() => toggleDrawer(true)}
        sx={{
          mr: 2,
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor='left'
        open={open}
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
      >
        <Box
          sx={{
            p: 2,
            height: 1,
            backgroundColor: '#F5F9E7',
          }}
        >
          <IconButton sx={{ mb: 2 }} onClick={closeDrawer}>
            <CloseIcon />
          </IconButton>

          <Divider sx={{ mb: 2 }} />

          {user ? (
            <Box sx={{ mb: 2 }}>
              <ListItemButton
                button
                onClick={() => handleNavigation('/dashboard')}
              >
                <ListItemIcon>
                  <AppsIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Dashboard' />
              </ListItemButton>

              <ListItemButton
                button
                onClick={() => handleNavigation('/meditate')}
              >
                <ListItemIcon>
                  <SelfImprovementIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Meditate' />
              </ListItemButton>

              <ListItemButton
                button
                onClick={() => handleNavigation('/calendar')}
              >
                <ListItemIcon>
                  <ScheduleIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Moods' />
              </ListItemButton>

              <ListItemButton
                button
                onClick={() => handleNavigation('/journal')}
              >
                <ListItemIcon>
                  <CreateIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Journal' />
              </ListItemButton>

              <ListItemButton button onClick={() => handleNavigation('/cloud')}>
                <ListItemIcon>
                  <SportsCricketIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Clouds' />
              </ListItemButton>
            </Box>
          ) : (
            <Box sx={{ mb: 2 }}>
              <ListItemButton
                button
                onClick={() => handleNavigation('/meditate')}
              >
                <ListItemIcon>
                  <SelfImprovementIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Meditate' />
              </ListItemButton>

              <ListItemButton button onClick={() => handleNavigation('/cloud')}>
                <ListItemIcon>
                  <SportsCricketIcon sx={{ color: 'analogous.main2' }} />
                </ListItemIcon>
                <ListItemText primary='Clouds' />
              </ListItemButton>
            </Box>
          )}

          {search}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '0',
              left: '50%',
              transform: 'translate(-50%, 0)',
            }}
          >
            {user ? (
              <Button
                variant='outlined'
                onClick={() => {
                  handleNavigation('/');
                }}
                sx={{ m: 1, width: 0.5 }}
              >
                Random
              </Button>
            ) : (
              <Button
                variant='outlined'
                onClick={() => handleNavigation('/signup')}
                sx={{ m: 1, width: 0.5 }}
              >
                Signup
              </Button>
            )}
            {user ? (
              <Button
                variant='outlined'
                onClick={() => {
                  dispatch(setUser(null));
                  removeUserToken();
                  handleNavigation('/');
                }}
                sx={{ m: 1, width: 0.5 }}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant='outlined'
                onClick={() => handleNavigation('/login')}
                sx={{ m: 1, width: 0.5 }}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </StyledHamburgerMenu>
  );
}
