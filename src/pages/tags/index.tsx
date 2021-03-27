import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import { TagListResponse } from '../../types/tag';
import { client } from '../../utils/api';

type StaticProps = {
  tagList: TagListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ tagList }) => {
  return (
    <main>
      <section>
        <h1>タグ一覧</h1>
        <ul>
          {tagList.contents.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </section>
    </main>
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
