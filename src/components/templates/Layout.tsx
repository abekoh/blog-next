import React from 'react';

import { makeStyles } from '@material-ui/core';

import Footer from './Footer';
import Header from './Header';

type Props = {
  blogTitle: string;
  copyright: string;
};
const Layout: React.FC<Props> = ({ children, blogTitle, copyright }) => {
  return (
    <>
      <Header blogTitle={blogTitle} />
      <main>{children}</main>
      <Footer copyright={copyright} />
      <style jsx global>
        {`
          html,
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
