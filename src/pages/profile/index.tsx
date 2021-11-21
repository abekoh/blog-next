import { Box, Grid } from '@mui/material';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
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
                  <li>名前: abekoh (Kotaro Abe, 阿部 耕太郎)</li>
                  <li>出身: 福岡県</li>
                  <li>所在地: 東京都</li>
                  <li>趣味: アニメ、ゲーム、技術書漁り</li>
                  <li>特技: トロンボーン</li>
                </ul>
              </Box>
            </Grid>
          </Grid>
        </About>
        <About title="History">
          <ul>
            <li>
              2012- 九州大学工学部電気情報工学科
              <ul>
                <li>
                  学部4年より
                  <a href="http://human.ait.kyushu-u.ac.jp/">
                    ヒューマンインタフェース研究室(内田研究室)
                  </a>
                  に所属
                </li>
                <li>画像系を中心にパターン認識、機械学習について研究</li>
              </ul>
            </li>
            <li>
              2016- 九州大学大学院システム情報科学府情報知能工学専攻
              <ul>
                <li>研究室は変わらず</li>
                <li>
                  修論テーマは&quot;Generative Adversarial
                  Networks(GAN)を用いたフォント生成に関する研究&quot;
                </li>
              </ul>
            </li>
            <li>
              2018- ヤフー株式会社
              <ul>
                <li>Web広告システムの審査システムの開発・運用・保守に携わる</li>
                <li>
                  よく触っていたもの: Java, Spring, Oracle Database, Kubernetes
                </li>
              </ul>
            </li>
            <li>2021- 株式会社MICIN</li>
          </ul>
        </About>
        <About title="Skills">
          <InterestedTags interestedTags={interestedTags} />
        </About>
        <About title="Links">
          <ul>
            <li>
              <a href={`https://twitter.com/${siteData.twitterUserName}`}>
                Twitter
              </a>
            </li>
            <li>
              <a href={`https://github.com/${siteData.githubUserName}`}>
                GitHub
              </a>
            </li>
            <li>
              <a href={`https://qiita.com/abekoh`}>Qiita</a>
            </li>
            <li>
              <a href={`https://zenn.dev/abekoh`}>Zenn</a>
            </li>
          </ul>
        </About>
        <p>
          お問い合わせについては<Link href="/contact">こちら</Link>
        </p>
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
