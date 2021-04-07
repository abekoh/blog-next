import { createMuiTheme } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';
const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: indigo,
    mode: 'light',
  },
  typography: {
    fontFamily:
      "'Roboto', 'Noto Sans JP', 'Helvetica', 'Arial', 'Hiragino Kaku Gothic Pro', 'メイリオ', sans-serif",
    body1: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        'html, #__next': {
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        },
        main: {
          flex: 1,
        },
        a: {
          textDecoration: `underline dotted ${blue[200]}`,
          textUnderlinePosition: 'under',
          color: 'unset',
          '&:hover': {
            textDecorationColor: blue[500],
          },
        },
      },
    },
  },
});

export default theme;
