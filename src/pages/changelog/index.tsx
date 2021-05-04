import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { githubData } from '../../data/github';
import { siteData } from '../../data/site';
import { ReleaseInfo } from '../../types/release';
import { githubClient } from '../../utils/api';
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
        {releaseInfoList.map((releaseInfo) => (
          <>
            <h2>{releaseInfo.title}</h2>
            <p>{releaseInfo.description}</p>
          </>
        ))}
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const releases = await githubClient.rest.repos.listReleases({
    owner: githubData.owner,
    repo: githubData.blogRepository,
  });
  if (releases.status !== 200) {
    return {
      props: { releaseInfoList: [] },
      revalidate: 60,
    };
  }
  const releaseInfoList: ReleaseInfo[] = releases.data.map((release: any) => {
    return {
      publishedAt: release.published_at,
      title: release.name,
      description: release.body,
    };
  });
  return {
    props: { releaseInfoList },
    revalidate: 60,
  };
};

export default Page;
