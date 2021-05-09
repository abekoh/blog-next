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
  Breakpoint,
} from '@material-ui/core';
import { ListItemIcon } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import DescriptionIcon from '@material-ui/icons/Description';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';

import Link from '../utils/Link';

const DRAWER_SWITCH_BREAKPOINT: Breakpoint = 'md';

const useStyles = makeStyles((theme) => ({
  title: {
    color: theme.palette.primary.contrastText,
  },
  tab: {
    color: theme.palette.primary.contrastText,
  },
  menuHorizonal: {
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      display: 'none',
    },
  },
  menuDrawer: {
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      display: 'none',
    },
  },
  menuList: {
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    },
  },
  menuListItem: {
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      minWidth: '180px',
    },
  },
  menuListIcon: {
    minWidth: '32px',
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.text.primary,
    },
  },
  menuListText: {
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.text.primary,
    },
  },
}));

type Props = {
  blogTitle: string;
};
const Header: React.FC<Props> = ({ blogTitle }) => {
  const classes = useStyles();
  const tabList = [
    {
      label: 'Profile',
      link: '/profile',
      icon: <PersonIcon />,
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
  const menuList = (
    <List className={classes.menuList}>
      {tabList.map(({ label, link, icon }) => (
        <Link href={link} key={label} onClick={toggleDrawer(false)}>
          <ListItem button className={classes.menuListItem}>
            {icon && (
              <ListItemIcon className={classes.menuListIcon}>
                {icon}
              </ListItemIcon>
            )}
            <ListItemText className={classes.menuListText}>
              {label}
            </ListItemText>
          </ListItem>
        </Link>
      ))}
    </List>
  );

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
          <Grid container justifyContent="flex-end">
            <Grid item className={classes.menuDrawer}>
              <IconButton
                color="inherit"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '32px' }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={state.drawer}
                onClose={toggleDrawer(false)}
              >
                {menuList}
              </Drawer>
            </Grid>
            <Grid item className={classes.menuHorizonal}>
              {menuList}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
