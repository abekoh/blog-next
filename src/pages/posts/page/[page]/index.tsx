import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';

import Pagenation from '../../../../components/molecules/Pagenation';
import { PostListResponse } from '../../../../types/post';
import { client } from '../../../../utils/api';
import { strToInteger } from '../../../../utils/isNumber';

const PER_PAGE = 10;

type StaticProps = {
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { postList } = props;
  return (
    <main>
      <section>
        <h2>投稿一覧</h2>
        <ul>
          {postList.contents.map((post) => (
            <li key={post.id}>
              <Link href={`/posts/${post.id}`}>
                <a>{post.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Pagenation perPageCount={PER_PAGE} totalCount={postList.totalCount} />
    </main>
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
      fields: 'id,title',
      orders: '-publishedAt',
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
    },
  });
  return {
    props: { postList },
    revalidate: 60,
  };
};

export default Page;
