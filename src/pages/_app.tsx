import React, { useEffect } from 'react';

import { CssBaseline, ThemeProvider } from '@material-ui/core';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';

import Layout from '../components/templates/Layout';
import theme from './theme';

// サイトデータ情報、いずれはmicroCMSから取れるようにしたい
const siteData = {
  title: "abekoh's tech note",
  author: 'abekoh',
  copyright: '© 2019 abekoh',
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout blogTitle={siteData.title} copyright={siteData.copyright}>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
};

export default App;
