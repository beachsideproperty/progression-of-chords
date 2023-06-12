import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import {
  SportsCricket as SportsCricketIcon,
  Schedule as ScheduleIcon,
  Create as CreateIcon,
  SelfImprovement as SelfImprovementIcon,
} from '@mui/icons-material';

const LinkCard = ({ title, icon, link }) => (
  <Card
    sx={{
      m: 1,
      borderRadius: '10px',
    }}
  >
    <CardContent
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        pt: 2,
      }}
    >
      {icon}
      <Link to={link} style={{ textDecoration: 'none' }}>
        <Typography
          variant='h6'
          component='div'
          sx={{ ml: 1, color: '#7c9246' }}
        >
          {title}
        </Typography>
      </Link>
    </CardContent>
  </Card>
);

const linkCardsData = [
  { title: 'Meditate', icon: <SelfImprovementIcon />, link: '/meditate' },
  { title: 'Mood', icon: <CreateIcon />, link: '/journal' },
  { title: 'Calendar', icon: <ScheduleIcon />, link: '/calendar' },
  { title: 'Game', icon: <SportsCricketIcon />, link: '/cloud' },
];

export { LinkCard, linkCardsData };
