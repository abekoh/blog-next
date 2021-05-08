import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageTitle from '../../components/molecules/PageTitle';
import ChangeLogList from '../../components/organisms/ChangeLogList';
import { siteData } from '../../data/site';
import { ReleaseInfo } from '../../types/release';
import { getReleaseInfo } from '../../utils/githubClient';
import { generateJsonld } from '../../utils/jsonld';

type StaticProps = {
  releaseInfoList: ReleaseInfo[];
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ releaseInfoList }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Changelog - {siteData.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Changelog" />
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
        <PageTitle title="Changelog" />
        <ChangeLogList changeLogElements={releaseInfoList} />
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const releaseInfoList = await getReleaseInfo();
  return {
    props: { releaseInfoList },
    revalidate: 60,
  };
};

export default Page;
