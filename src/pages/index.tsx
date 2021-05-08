import React from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageTitle from '../components/molecules/PageTitle';
import PostCardList from '../components/organisms/PostCardList';
import TopProfile from '../components/organisms/TopProfile';
import { siteData } from '../data/site';
import { PostListResponse } from '../types/post';
import { ReleaseInfo } from '../types/release';
import { microcmsClient } from '../utils/api';
import { getReleaseInfo } from '../utils/githubClient';
import { generateJsonld } from '../utils/jsonld';

type StaticProps = {
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const router = useRouter();
  const { postList } = props;
  return (
    <>
      <Head>
        <title>{siteData.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteData.title} />
        <meta property="og:url" content={`${siteData.host}${router.asPath}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonld([
              {
                type: 'WebSite',
              },
            ]),
          }}
        />
      </Head>
      <section>
        <PageTitle title="About" />
        <TopProfile />
        <PageTitle title="Recent Posts" />
        <PostCardList posts={postList.contents} pickuped={true} />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postList = await microcmsClient.v1.posts.$get({
    query: {
      fields: 'id,title,publishedAt,modifiedAt,tags',
      orders: '-publishedAt',
      limit: 4,
    },
  });

  return {
    props: { postList },
    revalidate: 60,
  };
};

export default Page;
