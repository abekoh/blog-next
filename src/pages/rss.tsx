import { GetServerSidePropsContext } from 'next';

import { generateFeedXml } from '../utils/generateFeedXml';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateFeedXml();

  res.statusCode = 200;
  // 1時間キャッシュ
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = () => null;

export default Page;
