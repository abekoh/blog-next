import React from 'react';

import { Alert, Box, Button, Typography } from '@material-ui/core';
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from 'next';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';

import Post from '../../../components/organisms/Post';
import Link from '../../../components/utils/Link';
import { siteData } from '../../../data/site';
import { PostResponse } from '../../../types/post';
import { client } from '../../../utils/api';
import { generateJsonld } from '../../../utils/jsonld';
import { toStringId } from '../../../utils/toStringId';

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

  const ogpImageUrl = `${siteData.host}/api/ogp-images/${post.id}`;
  const thisPageUrl = `${siteData.host}${router.asPath}`;

  return (
    <>
      <Head>
        <title>
          {post.title} - {siteData.title}
        </title>
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:url" content={thisPageUrl} />
        {post.summary && (
          <meta property="og:description" content={post.summary} />
        )}
        <meta property="og:image" content={ogpImageUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonld([
              {
                type: 'Article',
                headline: post.title,
                description: post.summary,
                datePublished: post.publishedAt,
                dateModified: post.modifiedAt,
                image: ogpImageUrl
                  ? [{ type: 'ImageObject', url: ogpImageUrl }]
                  : [],
              },
              {
                type: 'BreadcrumbList',
                itemListElement: [
                  {
                    type: 'ListItem',
                    position: 1,
                    name: 'Posts',
                    path: '/posts',
                  },
                  {
                    type: 'ListItem',
                    position: 2,
                    name: post.title || '',
                  },
                ],
              },
            ]),
          }}
        />
      </Head>
      {draftKey && (
        <Box my={1}>
          <Alert severity="info">
            <Typography variant="body1">プレビューモードで表示中</Typography>
            <Link href={`/api/exit-preview?id=${post.id}`}>
              <Button variant="outlined">プレビューを解除</Button>
            </Link>
          </Alert>
        </Box>
      )}
      <section>
        {body && post.title && post.publishedAt && (
          <Post
            title={post.title}
            body={body}
            publishedAt={post.publishedAt}
            modifiedAt={post.modifiedAt}
            categories={post.categories || []}
            tags={post.tags || []}
            url={thisPageUrl}
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
  const draftKey = previewData?.draftKey
    ? { draftKey: previewData.draftKey }
    : {};
  try {
    const post = await client.v1.posts._id(id).$get({
      query: {
        fields:
          'id,title,summary,body,htmlBody,isHtml,tags,categories,publishedAt,modifiedAt',
        ...draftKey,
      },
    });
    return {
      props: { post, ...draftKey },
      revalidate: 60,
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default Page;
