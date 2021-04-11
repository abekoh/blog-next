import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

import Post from '../../../components/organisms/Post';
import { siteData } from '../../../data/site';
import { PostResponse } from '../../../types/post';
import { client } from '../../../utils/api';
import { toStringId } from '../../../utils/toStringId';
import { Alert, Box } from '@material-ui/core';

type StaticProps = {
  post: PostResponse;
  draftKey?: string;
};
type PageProps = InferGetServerSidePropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { post, draftKey } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const body = post.isHtml ? post.htmlBody : post.body;

  return (
    <>
      <Head>
        <title>
          {post.title} - {siteData.title}
        </title>
      </Head>
      {draftKey && (
        <Box my={1}>
          <Alert severity="info">プレビューモードで表示中</Alert>
        </Box>
      )}
      <section>
        {body && post.title && post.publishedAt && (
          <Post
            title={post.title}
            body={body}
            publishedAt={post.publishedAt}
            categories={post.categories || []}
            tags={post.tags || []}
          />
        )}
      </section>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params, previewData } = context;
  if (!params?.id) {
    throw new Error('Error: not found');
  }
  const id = toStringId(params.id);
  const draftKey = previewData?.drafyKey;
  try {
    const post = await client.v1.posts._id(id).$get({
      query: {
        fields: 'id,title,body,htmlBody,isHtml,tags,categories,publishedAt',
        draftKey,
      },
    });
    return {
      props: { post, draftKey },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Page;
