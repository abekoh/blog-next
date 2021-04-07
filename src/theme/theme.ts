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
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 800,
    body: {
      fontSize: '1rem',
    },
  },
});

export default theme;
