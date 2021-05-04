import React, { useState } from 'react';

import {
  AppBar,
  Box,
  Grid,
  Drawer,
  makeStyles,
  IconButton,
  List,
  ListItemText,
  ListItem,
  Button,
} from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import InfoIcon from '@material-ui/icons/Info';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MenuIcon from '@material-ui/icons/Menu';

import Link from '../utils/Link';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.contrastText,
  },
  tab: {
    color: theme.palette.primary.contrastText,
  },
  menuHorizonal: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  menuDrawer: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawerLink: {
    color: theme.palette.text.primary,
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
      icon: <InfoIcon />,
    },
    {
      label: 'Posts',
      link: '/posts',
      icon: <DescriptionIcon />,
    },
    {
      label: 'Tags',
      link: '/tags',
      icon: <LocalOfferIcon />,
    },
  ];
  const [state, setState] = useState({
    drawer: false,
  });
  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setState({ drawer: open });
  };

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
          <Grid
            container
            justifyContent="flex-end"
            spacing={2}
            className={classes.menuHorizonal}
          >
            <List sx={{ display: 'flex', flexDirection: 'row' }}>
              {tabList.map(({ label, link, icon }) => (
                <Grid item key={label}>
                  <Link href={link}>
                    <Button sx={{ color: 'white' }}>{label}</Button>
                  </Link>
                </Grid>
              ))}
            </List>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            className={classes.menuDrawer}
          >
            <Grid item>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Drawer
              anchor="right"
              open={state.drawer}
              onClose={toggleDrawer(false)}
            >
              <List>
                {tabList.map(({ label, link, icon }) => (
                  <Link href={link} key={label} onClick={toggleDrawer(false)}>
                    <ListItem button>
                      {icon && <ListItemIcon>{icon}</ListItemIcon>}
                      <ListItemText className={classes.drawerLink}>
                        {label}
                      </ListItemText>
                    </ListItem>
                  </Link>
                ))}
              </List>
            </Drawer>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
