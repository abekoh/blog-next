import { Typography } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import PageTitle from '../components/molecules/PageTitle';
import PostCardList from '../components/organisms/PostCardList';
import { PostListResponse } from '../types/post';
import { SiteDataResponse } from '../types/siteData';
import { client } from '../utils/api';

type StaticProps = {
  siteData: SiteDataResponse;
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
  const siteDataPromise = client.v1.sitedata.$get({
    query: { fields: 'title' },
  });
  const postListPromise = client.v1.posts.$get({
    query: { fields: 'id,title,publishedAt,tags', orders: '-publishedAt', limit: 4 },
  });
  const [siteData, postList] = await Promise.all([
    siteDataPromise,
    postListPromise,
  ]);
  return {
    props: { siteData, postList },
    revalidate: 60,
  };
};

export default Page;
