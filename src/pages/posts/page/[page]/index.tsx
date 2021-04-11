import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';

import PaginationLinks from '../../../../components/molecules/PagenationLinks';
import { PostListResponse } from '../../../../types/post';
import { client } from '../../../../utils/api';
import { strToInteger } from '../../../../utils/isNumber';
import Head from 'next/head';
import { siteData } from '../../../../data/site';
import PageTitle from '../../../../components/molecules/PageTitle';
import PostCard from '../../../../components/molecules/PostCard';
import PostCardList from '../../../../components/organisms/PostCardList';

const PER_PAGE = 10;

type StaticProps = {
  currentPage: number;
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ currentPage, postList }) => {
  const totalPage = Math.ceil(postList.totalCount / PER_PAGE);
  return (
    <>
      <Head>
        <title>Posts - {siteData.title}</title>
      </Head>
      <section>
        <PageTitle title="Posts" />
        <PostCardList posts={postList.contents} />
      </section>
      <PaginationLinks
        currentPage={currentPage}
        totalPage={totalPage}
        prefix={`/posts/page/`}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  if (!params?.page || typeof params.page !== 'string') {
    throw new Error('Error: invalid page number');
  }
  const page = strToInteger(params.page);
  if (!page) {
    throw new Error('Error: invalid page number');
  }
  const postList = await client.v1.posts.$get({
    query: {
      fields: 'id,title,publishedAt,tags',
      orders: '-publishedAt',
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
    },
  });
  return {
    props: { currentPage: page, postList },
    revalidate: 60,
  };
};

export default Page;
