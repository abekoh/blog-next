import React from 'react';

import { NextPage } from 'next';
import { AppProps } from 'next/app';

import Layout from '../components/templates/Layout';

const siteData = {
  title: "abekoh's tech note",
  author: 'abekoh',
  copyright: '© 2019 abekoh',
};

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  // サイトデータ情報、いずれはmicroCMSから取れるようにしたい
  return (
    <Layout blogTitle={siteData.title} copyright={siteData.copyright}>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
