import { createMuiTheme } from '@material-ui/core';
import { blue, deepPurple, purple } from '@material-ui/core/colors';

// defaults: https://next.material-ui.com/customization/default-theme/#main-content
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: purple,
    mode: 'light',
  },
  typography: {
    fontFamily:
      "'Roboto', 'Noto Sans JP', 'Helvetica', 'Arial', 'Hiragino Kaku Gothic Pro', 'メイリオ', sans-serif",
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
