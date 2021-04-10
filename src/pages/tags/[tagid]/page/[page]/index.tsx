import React from 'react';

import { Icon } from '@material-ui/core';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';

import PaginationLinks from '../../../../../components/molecules/PagenationLinks';
import { PostListResponse } from '../../../../../types/post';
import { TagResponse } from '../../../../../types/tag';
import { client } from '../../../../../utils/api';
import { strToInteger } from '../../../../../utils/isNumber';
import { toStringId } from '../../../../../utils/toStringId';

const PER_PAGE = 10;

type StaticProps = {
  currentPage: number;
  tag: TagResponse;
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { currentPage, tag, postList } = props;
  return (
    <>
      <section>
        <h2>{tag.name}の記事一覧</h2>
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
      <PaginationLinks
        currentPage={currentPage}
        totalPage={Math.ceil(postList.totalCount / PER_PAGE)}
        prefix={`/tags/${tag.id}/page/`}
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
  if (!params?.tagid) {
    throw new Error('Error: invalid tagid');
  }
  if (!params?.page || typeof params.page !== 'string') {
    throw new Error('Error: invalid page number');
  }
  const page = strToInteger(params.page);
  if (!page) {
    throw new Error('Error: invalid page number');
  }
  const tagId = toStringId(params.tagid);
  const tagPromise = client.v1.tags._id(tagId).$get({
    query: {
      fields: 'id,name',
    },
  });
  const postListPromise = client.v1.posts.$get({
    query: {
      fields: 'id,title',
      orders: '-publishedAt',
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      filters: `tags[contains]${tagId}`,
    },
  });
  const [tag, postList] = await Promise.all([tagPromise, postListPromise]);
  return {
    props: { currentPage: page, tag, postList },
    revalidate: 60,
  };
};

export default Page;
