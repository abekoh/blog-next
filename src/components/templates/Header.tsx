import React from 'react';

import { AppBar, makeStyles, MenuItem, MenuList } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
  titleLink: {
    textDecoration: 'none',
  },
  title: {
    color: theme.palette.text.primary,
  },
  menuList: {
    display: 'flex',
  },
}));

type Props = {
  blogTitle: string;
};
const Header: React.FC<Props> = ({ blogTitle }) => {
  const classes = useStyles();
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Link href={`/`}>
            <a className={classes.titleLink}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {blogTitle}
              </Typography>
            </a>
          </Link>
          <MenuList className={classes.menuList}>
            <Link href={`/about`}>
              <MenuItem>About</MenuItem>
            </Link>
            <Link href={`/posts`}>
              <MenuItem>Posts</MenuItem>
            </Link>
            <Link href={`/tags`}>
              <MenuItem>Tags</MenuItem>
            </Link>
          </MenuList>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
