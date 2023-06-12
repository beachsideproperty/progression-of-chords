import React from 'react';
import { useSelector } from 'react-redux';
import { Box, CardContent, Typography } from '@mui/material';
import oceanVideo from '../../oceanVideo.mp4';
import Wrapper from '../style.js';
import { LinkCard, linkCardsData } from './LinkCard';
import { MusicCard } from './MusicCard';

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Wrapper videoSrc={oceanVideo}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          maxWidth: '800px',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: 0.8,
          }}
        >
          <Box
            sx={{ display: 'flex', flex: 1, border: '2px solid black', mb: 4 }}
          >
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography
                variant='button'
                color='white'
                component='div'
                sx={{
                  textAlign: 'center',
                  fontSize: '1.25rem',
                  textShadow: '3px 3px 0 black',
                }}
              >
                Welcome back, {user.firstName}!
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: 0.8,
                }}
              >
                {linkCardsData.map((card) => (
                  <LinkCard
                    key={card.title}
                    title={card.title}
                    icon={card.icon}
                    link={card.link}
                  />
                ))}
              </Box>
            </CardContent>
          </Box>

          <MusicCard />
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
