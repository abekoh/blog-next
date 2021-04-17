import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import PageTitle from '../components/molecules/PageTitle';
import PostCardList from '../components/organisms/PostCardList';
import { siteData } from '../data/site';
import { PostListResponse } from '../types/post';
import { client } from '../utils/api';
import { generateJsonld } from '../utils/jsonld';

type StaticProps = {
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { postList } = props;
  return (
    <>
      <Head>
        <title>{siteData.title}</title>
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
        <PageTitle title="Recent Posts" />
        <PostCardList posts={postList.contents} pickuped={true} />
      </section>
    </>
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
