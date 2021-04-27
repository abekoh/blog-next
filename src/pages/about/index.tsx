import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import About from '../../components/organisms/About';
import InterestedTags from '../../components/organisms/InterestedTags';
import { siteData } from '../../data/site';
import { AboutListResponse } from '../../types/about';
import { InterestedTagsResponse } from '../../types/interestedTags';
import { client } from '../../utils/api';
import { generateJsonld } from '../../utils/jsonld';

type StaticProps = {
  aboutList: AboutListResponse;
  interestedTags: InterestedTagsResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ aboutList, interestedTags }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>About - {siteData.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About" />
        <meta property="og:url" content={`${siteData.host}${router.asPath}`} />
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
        {aboutList.contents.map((about) => (
          <About key={about.id} title={about.title} body={about.body} />
        ))}
        <About title="Topics">
          <InterestedTags interestedTags={interestedTags} />
        </About>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const aboutListPromise = client.v1.about.$get({
    query: { fields: 'id,order,title,body', orders: 'order' },
  });
  const interestedTagsPromise = client.v1.interested_tags.$get({
    query: { fields: 'id,skillful,canuse,alittle,notouch' },
  });
  const [aboutList, interestedTags] = await Promise.all([
    aboutListPromise,
    interestedTagsPromise,
  ]);
  return {
    props: { aboutList, interestedTags },
    revalidate: 60,
  };
};

export default Page;
