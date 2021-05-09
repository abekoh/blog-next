import { Box, Grid } from '@material-ui/core';
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
          <>
            <h3>大学～大学院</h3>
            <p>
              九州大学工学部電気情報工学科 (学士・2012-2016)
              <br />
              九州大学大学院システム情報科学府情報知能工学専攻 (修士・2016-2018)
            </p>
            <p>
              研究室は
              <a href="http://human.ait.kyushu-u.ac.jp/">
                ヒューマンインタフェース研究室(内田研究室)
              </a>
              に所属。画像系を中心にパターン認識、機械学習について学ぶ。
              <br />
              修士時代の研究テーマは&quot;Generative Adversarial
              Networks(GAN)を用いたフォント生成に関する研究&quot;
            </p>
            <h3>卒業後～</h3>
            <p>ヤフー株式会社 (2018-)</p>
            <p>Web広告システムの審査システムの開発・運用・保守に携わる。</p>
          </>
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
