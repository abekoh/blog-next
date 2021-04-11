import { GetServerSidePropsContext } from 'next';

const APP_HOST = process.env.HOST || '';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const text = `User-Agent:* Disallow: Sitemap:${APP_HOST}/sitemap.xml`;
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(text);

  return {
    props: {},
  };
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Page = () => null;
export default Page;
