import React from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import PageTitle from '../../components/molecules/PageTitle';
import TagList from '../../components/molecules/TagList';
import { siteData } from '../../data/site';
import { TagListResponse } from '../../types/tag';
import { microcmsClient } from '../../utils/api';
import { generateJsonld } from '../../utils/jsonld';

type StaticProps = {
  tagList: TagListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ tagList }) => {
  return (
    <>
      <Head>
        <title>Tags - {siteData.title}</title>
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
        <PageTitle title="Tags" />
        <TagList tags={tagList.contents} linkable={true} />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const tagList = await microcmsClient.v1.tags.$get({
    query: {
      fields: 'id,name,icon',
      limit: 100,
      orders: 'name',
      filters: `noRef[not_equals]true`,
    },
  });
  return {
    props: { tagList },
    revalidate: 60,
  };
};

export default Page;
