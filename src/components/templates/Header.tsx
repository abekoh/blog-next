import React from 'react';

import { AppBar } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

type Props = {
  blogTitle: string;
};
const Header: React.FC<Props> = ({ blogTitle }) => {
  return (
    <header>
      <AppBar position="static">
        <Toolbar>
          <Typography component="h1" variant="h5">
            {blogTitle}
          </Typography>
          <ul>
            <li>
              <Link href={`/`}>Home</Link>
            </li>
            <li>
              <Link href={`/about`}>About</Link>
            </li>
            <li>
              <Link href={`/posts`}>Posts</Link>
            </li>
            <li>
              <Link href={`/tags`}>Tags</Link>
            </li>
          </ul>
        </Toolbar>
      </AppBar>
    </header>
  );
};

export default Header;
