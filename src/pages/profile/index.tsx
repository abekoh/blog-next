import { Box, Grid } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import MyAvatar from '../../components/atoms/MyAvatar';
import PageTitle from '../../components/molecules/PageTitle';
import About from '../../components/organisms/About';
import { siteData } from '../../data/site';
import { InterestedTagsResponse } from '../../types/interestedTags';
import { microcmsClient } from '../../utils/api';
import { generateJsonld } from '../../utils/jsonld';

type StaticProps = {
  interestedTags: InterestedTagsResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = ({ interestedTags }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Profile - {siteData.title}</title>
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
        <PageTitle title="Profile" />
        <About title="Bio">
          <>
            <Grid container alignItems="center">
              <Grid item xs={12} md={2}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    padding: '1.0rem',
                  }}
                >
                  <MyAvatar />
                </Box>
              </Grid>
              <Grid item xs={12} md={10}>
                <Box>
                  <ul>
                    <li>abekoh (Kotaro Abe, 阿部 耕太郎)</li>
                    <li>Software Engineer</li>
                    <li>福岡県出身、東京都在住</li>
                    <li>
                      技術全般何でも好きで何でも触ってみてる。得意なのはサーバサイド。
                    </li>
                    <br />
                    <li style={{ fontWeight: 'bold' }}>
                      詳細なプロフィール・経歴→{' '}
                      <a href="https://github.com/abekoh/abekoh/blob/main/RESUME-ja.md">
                        abekoh/RESUME-ja.md
                      </a>
                    </li>
                    <li>
                      お問い合わせは<Link href="/contact">こちら</Link>から
                    </li>
                  </ul>
                </Box>
              </Grid>
            </Grid>
            <Box>
              <ul></ul>
            </Box>
          </>
        </About>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const interestedTags = await microcmsClient.v1.interested_tags.$get({
    query: { fields: 'id,skillful,canuse,alittle,notouch' },
  });
  return {
    props: { interestedTags },
    revalidate: 60,
  };
};

export default Page;
