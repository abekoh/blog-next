import React, { useState } from 'react';

import DescriptionIcon from '@mui/icons-material/Description';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { ListItemIcon } from '@mui/material';
import {
  AppBar,
  Box,
  Grid,
  Drawer,
  IconButton,
  List,
  ListItemText,
  ListItem,
  Breakpoint,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import Link from '../utils/Link';

const PREFIX = 'Header';

const classes = {
  title: `${PREFIX}-title`,
  tab: `${PREFIX}-tab`,
  menuHorizonal: `${PREFIX}-menuHorizonal`,
  menuDrawer: `${PREFIX}-menuDrawer`,
  menuList: `${PREFIX}-menuList`,
  menuListItem: `${PREFIX}-menuListItem`,
  menuListIcon: `${PREFIX}-menuListIcon`,
  menuListText: `${PREFIX}-menuListText`,
};

const Root = styled('header')(({ theme }) => ({
  [`& .${classes.title}`]: {
    color: theme.palette.primary.contrastText,
  },

  [`& .${classes.tab}`]: {
    color: theme.palette.primary.contrastText,
  },

  [`& .${classes.menuHorizonal}`]: {
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      display: 'none',
    },
  },

  [`& .${classes.menuDrawer}`]: {
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      display: 'none',
    },
  },

  [`& .${classes.menuList}`]: {
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    },
  },

  [`& .${classes.menuListItem}`]: {
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      minWidth: '180px',
    },
  },

  [`& .${classes.menuListIcon}`]: {
    minWidth: '32px',
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.text.primary,
    },
  },

  [`& .${classes.menuListText}`]: {
    [theme.breakpoints.up(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.primary.contrastText,
    },
    [theme.breakpoints.down(DRAWER_SWITCH_BREAKPOINT)]: {
      color: theme.palette.text.primary,
    },
  },
}));

const DRAWER_SWITCH_BREAKPOINT: Breakpoint = 'md';

type Props = {
  blogTitle: string;
};
const Header: React.FC<Props> = ({ blogTitle }) => {
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
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
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
    <Root>
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
                size="large"
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
    </Root>
  );
};

export default Header;
