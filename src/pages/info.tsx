import { GetServerSidePropsContext } from 'next';

const BUILD_DATETIME = process.env.BUILD_DATETIME || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const body = JSON.stringify({
    updatedAt: BUILD_DATETIME,
  });
  res.statusCode = 200;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間のキャッシュ
  res.setHeader('Content-Type', 'application/json');
  res.end(body);

  return {
    props: {},
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = () => null;
export default Page;
