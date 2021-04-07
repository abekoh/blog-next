import { createMuiTheme } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    second: indigo,
    mode: 'light',
  },
  typography: {
    fontFamily:
      "'Roboto', 'Noto Sans JP', 'Helvetica', 'Arial', 'Hiragino Kaku Gothic Pro', 'メイリオ', sans-serif",
    body: {
      fontSize: '1.1rem',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        a: {
          textDecoration: 'none',
        },
      },
    },
  },
});

export default theme;
