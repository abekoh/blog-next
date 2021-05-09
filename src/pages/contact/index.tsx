import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

import PageTitle from '../../components/molecules/PageTitle';
import About from '../../components/organisms/About';
import { siteData } from '../../data/site';
import { generateJsonld } from '../../utils/jsonld';

const contentList = [
  {
    body: `<p>お問い合わせは次のいずれかでよろしくお願いします。</p>
    <ul>
      <li>
        TwitterのDM:
        <a href="https://twitter.com/messages/compose?recipient_id=806874881908346880" class="twitter-dm-button" data-screen-name="@abekoh_bcky">
          Message @abekoh_bcky
        </a>
      </li>
      <li><a href="mailto:abekoh.bcky@gmail.com">abekoh.bcky@gmail.com</a></li>
    </ul>`,
  },
];

const Page: NextPage = () => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Contact - {siteData.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content="About" />
        <meta property="og:url" content={`${siteData.host}${router.asPath}`} />
        <script async src="https://platform.twitter.com/widgets.js" />
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
        <PageTitle title="Contact" />
        {contentList.map((content, i) => (
          <About key={i} title={content.title} body={content.body} />
        ))}
      </section>
    </>
  );
};

export default Page;
