import { createTheme } from '@mui/material/styles';

const myCustomPalette = {
  primary: {
    main: '#4C3670',
    main2: '#c9c8da',
  },
  secondary: {
    main: '#5a7036',
    main2: '#7c9246',
  },
  analogous: {
    main1: '#363d70',
    main2: '#363d70',
  },
  triadic: {
    main1: '#ae4172',
    main2: '#704c36',
  },
  complementary: {
    main: '#5a7036',
  },
  common: {
    black: '#000',
    white: '#fff',
  },
  error: {
    main: '#ff1744',
  },
  warning: {
    main: '#ff9100',
  },
  info: {
    main: '#2196f3',
  },
  success: {
    main: '#4caf50',
  },
};

const theme = createTheme({
  palette: myCustomPalette,
});

export default theme;
