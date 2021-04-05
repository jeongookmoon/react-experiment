import { createMuiTheme } from '@material-ui/core';

export const PRIMARY_KEY = 'id';

export const materialTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#BFBDC1',
      main: '#6D6A75',
      dark: '#37323E',
      contrastText: '#fff',
    },
  },
});
