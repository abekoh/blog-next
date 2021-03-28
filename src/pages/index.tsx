import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Link from 'next/link';

import { PostListResponse } from '../types/post';
import { SiteDataResponse } from '../types/siteData';
import { client } from '../utils/api';

type StaticProps = {
  siteData: SiteDataResponse;
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { siteData, postList } = props;
  return (
    <section>
      <h2>最近の投稿</h2>
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
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const siteDataPromise = client.v1.sitedata.$get({
    query: { fields: 'title' },
  });
  const postListPromise = client.v1.posts.$get({
    query: { fields: 'id,title', orders: '-publishedAt', limit: 5 },
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
