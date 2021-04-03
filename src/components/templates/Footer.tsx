import React from 'react';

import { AppBar, Grid, makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles({
  appbar: {
    top: 'auto',
    bottom: 0,
  },
});

type Props = {
  copyright: string;
};
const Footer: React.FC<Props> = ({ copyright }) => {
  const classes = useStyles();
  return (
    <footer>
      <AppBar position="relative" className={classes.appbar}>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography>{copyright}</Typography>
          </Grid>
        </Grid>
      </AppBar>
    </footer>
  );
};

export default Footer;
