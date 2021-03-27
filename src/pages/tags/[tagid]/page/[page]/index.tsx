import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Link from 'next/link';

import Pagenation from '../../../../../components/molecules/Pagenation';
import { PostListResponse } from '../../../../../types/post';
import { TagResponse } from '../../../../../types/tag';
import { client } from '../../../../../utils/api';
import { strToInteger } from '../../../../../utils/isNumber';
import { toStringId } from '../../../../../utils/toStringId';

const PER_PAGE = 10;

type StaticProps = {
  tag: TagResponse;
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { tag, postList } = props;
  return (
    <main>
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
  if (!params?.tagid) {
    throw new Error('Error: invalid tagid');
  }
  if (!params?.page || typeof params.page !== 'string') {
    throw new Error('Error: invalid page number');
  }
  const offset = strToInteger(params.page);
  if (!offset) {
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
      offset: offset,
      filters: `tags[contains]${tagId}`,
    },
  });
  const [tag, postList] = await Promise.all([tagPromise, postListPromise]);
  return {
    props: { tag, postList },
    revalidate: 60,
  };
};

export default Page;
