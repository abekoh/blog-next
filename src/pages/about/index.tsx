import { Typography } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import About from '../../components/organisms/About';
import { siteData } from '../../data/site';
import { AboutListResponse } from '../../types/about';
import { client } from '../../utils/api';

type StaticProps = {
  aboutList: AboutListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ aboutList }) => {
  return (
    <>
      <Head>
        <title>About - {siteData.title}</title>
      </Head>
      <section>
        {aboutList.contents.map((about) => (
          <About key={about.id} title={about.title} body={about.body} />
        ))}
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const aboutList = await client.v1.about.$get({
    query: { fields: 'id,order,title,body', orders: 'order' },
  });
  return {
    props: { aboutList },
    revalidate: 60,
  };
};

export default Page;
