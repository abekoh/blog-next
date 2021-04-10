import React from 'react';

import { Container } from '@material-ui/core';

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
      <main>
        <Container maxWidth="lg">{children}</Container>
      </main>
      <Footer copyright={copyright} />
    </>
  );
};

export default Layout;
