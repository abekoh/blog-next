import React from 'react';

import { AppBar, Box, Grid, makeStyles } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Link from '../utils/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.contrastText,
  },
  tab: {
    color: theme.palette.primary.contrastText,
  },
}));

type Props = {
  blogTitle: string;
};
const Header: React.FC<Props> = ({ blogTitle }) => {
  const classes = useStyles();
  const tabList = [
    {
      label: 'About',
      link: '/about',
    },
    {
      label: 'Posts',
      link: '/posts',
    },
    {
      label: 'Tags',
      link: '/tags',
    },
  ];
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Link href={`/`}>
            <Box display="flex" alignItems="flex-end">
              {/* <Avatar
                src="https://images.microcms-assets.io/assets/4f79e018736547879adf5670ebeaccc3/cd1895f87fd642538b8bec820745d1b0/avater.png"
                variant="square"
              /> */}
              <Typography
                component="h1"
                variant="h5"
                noWrap
                className={classes.title}
              >
                {blogTitle}
              </Typography>
            </Box>
          </Link>
          <Grid container justifyContent="flex-end" spacing={2}>
            {tabList.map(({ label, link }) => (
              <Grid item key={label}>
                <Link href={link}>
                  <Typography className={classes.tab}>{label}</Typography>
                </Link>
              </Grid>
            ))}
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
