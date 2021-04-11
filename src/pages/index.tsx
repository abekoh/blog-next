import { Typography } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import PageTitle from '../components/molecules/PageTitle';
import PostCardList from '../components/organisms/PostCardList';
import { PostListResponse } from '../types/post';
import { SiteDataResponse } from '../types/siteData';
import { client } from '../utils/api';

type StaticProps = {
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { postList } = props;
  return (
    <section>
      <PageTitle title="Recent Posts" />
      <ul>
        <PostCardList posts={postList.contents} pickuped={true} />
      </ul>
    </section>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const postList = await client.v1.posts.$get({
    query: {
      fields: 'id,title,publishedAt,tags',
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
