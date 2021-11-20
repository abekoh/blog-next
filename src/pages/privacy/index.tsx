import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageTitle from '../../components/molecules/PageTitle';
import About from '../../components/organisms/About';
import { siteData } from '../../data/site';
import { generateJsonld } from '../../utils/jsonld';

const contentList = [
  {
    body: '<p>当ブログでは、利用状況を把握するために<a style="color:#212121" href="https://analytics.google.com/analytics/web/" target="_blank" rel="noopener noreferrer">Google Analytics</a>を利用しております 。Google AnalyticsはCookieを利用して利用者の情報を収集します。Google Analyticsにおいてデータが収集 、処理される仕組みについては、<a style="color:#212121" href="https://policies.google.com/technologies/partner-sites?hl=ja" target="_blank" rel="noopener noreferrer">こちら</a>をご参照ください。</p>',
  },
];

const Page: NextPage = () => {
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
        <PageTitle title="Privacy Policy" />
        {contentList.map((content, i) => (
          <About key={i} body={content.body} />
        ))}
      </section>
    </>
  );
};

export default Page;
