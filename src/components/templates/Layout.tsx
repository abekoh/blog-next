import React from 'react';

import { Container } from '@mui/material';

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
        <Container maxWidth="md">{children}</Container>
      </main>
      <Footer copyright={copyright} />
    </>
  );
};

export default Layout;
