import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import calendarVideo from '../../calendarVideo.mp4';
import Wrapper from '../style.js';

const Journal = () => {
  const user = useSelector((state) => state.auth.user);
  const moods = useSelector((state) => state.moods.moods);
  const dispatch = useDispatch();

  const [entry, setEntry] = useState('');
  const [journalEntries, setJournalEntries] = useState([]);

  const handleSubmitEntry = () => {
    setJournalEntries([...journalEntries, entry]);
    setEntry('');
  };

  const handleClearEntries = () => {
    setJournalEntries([]);
  };

  return (
    <Wrapper videoSrc={calendarVideo}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          marginTop: '40px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            width: '40vh',
            border: 1,
            borderRadius: 5,
            marginTop: 5,
            paddingTop: 2,
            paddingBottom: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
          }}
        >
          {' '}
          coming soon{' '}
          {/* <Typography variant='overline' fontSize='16px' display='block'>
            Talk to yourself:
          </Typography>
          <textarea
            aria-label='empty textarea'
            placeholder='What am I feeling and why?'
            rows={25}
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            style={{
              width: '80%',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              resize: 'none',
              margin: '10px',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleSubmitEntry}
            >
              submit
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleClearEntries}
            >
              clear
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '30vh',
            width: '40vh',
            border: 1,
            borderRadius: 5,
            marginTop: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            overflowY: 'auto',
          }}
        >
          {journalEntries.map((entry, index) => (
            <Box
              key={index}
              sx={{
                width: '80%',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
                backgroundColor: '#fff',
                marginBottom: 2,
              }}
            >
              <Typography variant='body1'>{entry}</Typography>
            </Box>
          ))} */}
        </Box>
      </Box>
    </Wrapper>
  );
};

export default Journal;
