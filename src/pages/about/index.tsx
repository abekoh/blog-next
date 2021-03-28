import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';

import About from '../../components/organisms/About';
import { AboutListResponse } from '../../types/about';
import { client } from '../../utils/api';

type StaticProps = {
  aboutList: AboutListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ aboutList }) => {
  return (
    <section>
      <h1>About</h1>
      {aboutList.contents.map((about) => (
        <About key={about.id} title={about.title} body={about.body} />
      ))}
    </section>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const aboutList = await client.v1.about.$get({
    query: { fields: 'id,order,title,body', orders: 'order' },
  });
  return {
    props: { aboutList },
    revalidate: 60,
  };
};

export default Page;
