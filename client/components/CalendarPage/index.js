import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { fetchAllMoods } from '../../store/slices/moods';
import { format } from 'date-fns';
import Wrapper from '../style.js';
import MoodForm from './MoodForm';
import MoodCalendar from './MoodCalendar';
import calendarVideo from '../../calendarVideo.mp4';

const CalendarPage = () => {
  const navigate = useNavigate();
  const [initialValue, setInitialValue] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const formattedDate = format(initialValue, 'yyyy-MM-dd');
    setFormattedDate(formattedDate);
    dispatch(fetchAllMoods(formattedDate));
  }, [initialValue]);

  const handleDateChange = (newValue) => {
    setInitialValue(newValue);
    const newFormattedDate = format(newValue, 'yyyy-MM-dd');
    setFormattedDate(newFormattedDate);
  };

  if (!user) {
    navigate('/');
  }

  return (
    <Wrapper videoSrc={calendarVideo}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          minHeight: '100vh',
          padding: '2rem',
          margin: '0 auto',
          marginTop: '40px',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Box>
            <MoodCalendar
              initialValue={initialValue}
              onDateChange={handleDateChange}
              selectedMood={selectedMood}
            />
            <MoodForm
              formattedDate={formattedDate}
              selectedMood={selectedMood}
              setSelectedMood={setSelectedMood}
            />
          </Box>
        </LocalizationProvider>
      </Box>
    </Wrapper>
  );
};

export default CalendarPage;
