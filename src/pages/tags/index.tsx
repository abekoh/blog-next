import React from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import PageTitle from '../../components/molecules/PageTitle';
import { siteData } from '../../data/site';
import { TagListResponse } from '../../types/tag';
import { client } from '../../utils/api';
import TagList from '../../components/molecules/TagList';

type StaticProps = {
  tagList: TagListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ tagList }) => {
  return (
    <>
      <Head>
        <title>Tags - {siteData.title}</title>
      </Head>
      <section>
        <PageTitle title="Tags"/>
        <TagList tags={tagList.contents} linkable={true}/>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const tagList = await client.v1.tags.$get({
    query: { fields: 'id,name,icon', limit: 100 },
  });
  return {
    props: { tagList },
    revalidate: 60,
  };
};

export default Page;
