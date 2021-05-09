import {
  Box,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@material-ui/core';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import MyAvatar from '../../components/atoms/MyAvatar';
import PageTitle from '../../components/molecules/PageTitle';
import About from '../../components/organisms/About';
import InterestedTags from '../../components/organisms/InterestedTags';
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
        <title>Privacy Policy - {siteData.title}</title>
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
                  <li>名前: abekoh</li>
                  <li>出身: 福岡県</li>
                  <li>所在地: 東京都</li>
                  <li>趣味: アニメ、ゲーム、技術書漁り</li>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </About>
        <About title="History">
          <TableContainer>
            <TableBody>
              <TableRow>
                <TableCell>2012.04</TableCell>
                <TableCell>ヤフー株式会社 入社</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2018.04</TableCell>
                <TableCell>ヤフー株式会社 入社</TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </About>
        <About title="Topics">
          <InterestedTags interestedTags={interestedTags} />
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
