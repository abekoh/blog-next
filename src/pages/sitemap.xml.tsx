import { GetServerSidePropsContext } from 'next';

import { generateSitemapXml } from '../utils/generateSitemapXml';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.setHeader('Content-Type', 'text/xml');
  res.end(xml);

  return {
    props: {},
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = () => null;
export default Page;