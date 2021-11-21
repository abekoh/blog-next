import React, { useEffect } from 'react';

import {
  CssBaseline,
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from '@mui/material';
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Layout from '../components/templates/Layout';
import { siteData } from '../data/site';
import theme from '../theme/theme';
import * as gtag from '../utils/gtag';

declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    if (!gtag.GA_TRACKING_ID) return;

    const handleRouteChange = (url: string) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        <title>{siteData.title}</title>
        <meta property="og:site_name" content={siteData.title} />
        <meta property="og:locale" content="ja_JP" />
        <meta property="fb:app_id" content="587885512182115" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:site"
          content={`@${siteData.twitterUserName}`}
        />
        <meta
          property="twitter:creator"
          content={`@${siteData.twitterUserName}`}
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="theme-color" content={theme.palette.primary.light} />
        <meta
          name="msapplication-TileColor"
          content={theme.palette.primary.light}
        />
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color={theme.palette.primary.light}
        />
        <link
          rel="alternate"
          href={`${siteData.host}/feed`}
          type="application/rss+xml"
        />
      </Head>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Layout blogTitle={siteData.title} copyright={siteData.copyright}>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  );
};

export default App;
