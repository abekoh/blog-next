import { createMuiTheme } from '@material-ui/core';
import { blue, indigo } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    second: indigo,
    mode: 'light',
  },
});

export default theme;
