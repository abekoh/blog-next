import React from 'react';

import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import { TagListResponse } from '../../types/tag';
import { client } from '../../utils/api';
import { siteData } from '../../data/site';
import Head from 'next/head';

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
        <h1>Tags</h1>
        <ul>
          {tagList.contents.map((tag) => (
            <li key={tag.id}>
              <Link href={`/tags/${tag.id}`}>{tag.name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const tagList = await client.v1.tags.$get({
    query: { fields: 'id,name' },
  });
  return {
    props: { tagList },
    revalidate: 60,
  };
};

export default Page;
