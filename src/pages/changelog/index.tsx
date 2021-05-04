import { Grid } from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageTitle from '../../components/molecules/PageTitle';
import ChangeLogElement from '../../components/organisms/ChangeLogElement';
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
        <PageTitle title="Changelog" />
        <Grid container spacing={1} justifyContent="center">
          {releaseInfoList.map((releaseInfo) => (
            <Grid item xs={12} key={releaseInfo.publishedAt.toString()}>
              <ChangeLogElement
                title={releaseInfo.title}
                description={releaseInfo.description}
                publishedAt={releaseInfo.publishedAt}
              />
            </Grid>
          ))}
        </Grid>
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
  const releaseInfoList: ReleaseInfo[] = releases.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((release: any) => {
      return {
        publishedAt: release.published_at,
        title: release.name,
        description: release.body,
      };
    })
    .sort((e1, e2) => {
      if (e1.publishedAt > e2.publishedAt) return -1;
      if (e1.publishedAt < e2.publishedAt) return 1;
      return 0;
    });
  return {
    props: { releaseInfoList },
    revalidate: 60,
  };
};

export default Page;
