import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import Calendar from 'react-calendar';
import { fetchAllMoods } from '../../store/slices/moods';
import { formatCalendarDate, CalendarTile } from './moodTools';

const MoodCalendar = ({ initialValue, onDateChange }) => {
  const [value, setValue] = useState(new Date());
  const moods = useSelector((state) => state.moods.allMoods);
  const dispatch = useDispatch();
  const [highlightedDate, setHighlightedDate] = useState(
    formatCalendarDate(new Date())
  );

  useEffect(() => {
    dispatch(fetchAllMoods());
  }, [dispatch]);

  const handleDateChange = (date) => {
    const formattedDate = formatCalendarDate(date);
    setHighlightedDate(formattedDate);

    const mood = moods.find((mood) => mood.date === formattedDate);

    if (onDateChange) {
      onDateChange(date);
    }
  };

  const getMoodForDate = (date) => {
    const formattedDate = formatCalendarDate(date);
    const mood = moods.find((mood) => mood.date === formattedDate);

    return mood ? mood.mood : null;
  };

  const getTileClassName = ({ date }) => {
    const mood = getMoodForDate(date);
    const formattedDate = formatCalendarDate(date);
    const classes = [mood ? `mood-${mood}` : 'no-mood'];

    if (formattedDate === formatCalendarDate(initialValue)) {
      classes.push('highlighted-date');
    }

    return classes.join(' ');
  };

  const getTileContent = ({ date }) => {
    const mood = getMoodForDate(date);
    return <>{mood !== null ? <span>: {mood}</span> : ''}</>;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
      }}
    >
      <CalendarTile>
        <Calendar
          value={value}
          onChange={handleDateChange}
          tileClassName={getTileClassName}
          tileContent={getTileContent}
        />
      </CalendarTile>
    </Box>
  );
};

export default MoodCalendar;
