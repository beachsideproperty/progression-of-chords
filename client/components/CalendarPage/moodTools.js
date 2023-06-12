import { styled } from '@mui/system';

export const moodButtons = [
  { mood: 'Elated', url: 'https://i.gifer.com/JSQ.gif' },
  {
    mood: 'Happy',
    url: 'https://i.gifer.com/origin/ff/ff95320f2d482b0d3847efd6842c7d39_w200.gif',
  },
  {
    mood: 'Content',
    url: 'https://www.pngkit.com/png/full/349-3491873_hamtaro-pixel-hamster.png',
  },
  {
    mood: 'So-so',
    url: 'https://i.gifer.com/origin/fe/fea01b80b4d059622a8bba8e3e1655fc_w200.gif',
  },
  {
    mood: 'Unhappy',
    url: 'https://i.gifer.com/origin/5e/5e3bb1bffaa326ef4e12916d4e506829_w200.gif',
  },
  {
    mood: 'Despondent',
    url: 'https://64.media.tumblr.com/07ad0e204239ffaa1c17e71e5b74914b/e4b703e2f8b768b6-d6/s400x600/2bcda6d0dfeaffefe9659fbe62aaca57e65da730.gif',
  },
];

export const formatCalendarDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const CalendarTile = styled('div')(() => ({
  '.react-calendar__tile': {
    width: '4rem',
    height: '4rem',
    display: 'flex',
    border: '1px solid black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  '.highlighted-date': {
    border: '4px solid',
    borderImage: 'linear-gradient(to left, #555555, #FF69B4) 1',
    backgroundColor: '#f0f0f0',
  },
  '.react-calendar__month-view__weekdays__weekday': {
    fontWeight: 'bold',
    fontFamily: 'Arial',
  },
  '.mood-Elated': { backgroundColor: '#FF69B4' },
  '.mood-Happy': { backgroundColor: '#FF95C0' },
  '.mood-Content': { backgroundColor: '#FFC0CB' },
  '.mood-So-so': { backgroundColor: '#DCDCDC' },
  '.mood-Unhappy': { backgroundColor: '#A9A9A9' },
  '.mood-Despondent': { backgroundColor: '#555555' },
}));
