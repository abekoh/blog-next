import React from 'react';

import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next';
import Head from 'next/head';

import PaginationLinks from '../../../../../components/molecules/PagenationLinks';
import PageTitle from '../../../../../components/molecules/PageTitle';
import PostCardList from '../../../../../components/organisms/PostCardList';
import { siteData } from '../../../../../data/site';
import { PostListResponse } from '../../../../../types/post';
import { TagResponse } from '../../../../../types/tag';
import { microcmsClient } from '../../../../../utils/api';
import { strToInteger } from '../../../../../utils/isNumber';
import { generateJsonld } from '../../../../../utils/jsonld';
import { toStringId } from '../../../../../utils/toStringId';

const PER_PAGE = 10;

type StaticProps = {
  currentPage: number;
  tag: TagResponse;
  postList: PostListResponse;
};

type PageProps = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPage<PageProps> = (props) => {
  const { currentPage, tag, postList } = props;
  return (
    <>
      <Head>
        <title>
          Posts of {tag.name} - {siteData.title}
        </title>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: generateJsonld([
              {
                type: 'BreadcrumbList',
                itemListElement: [
                  {
                    type: 'ListItem',
                    position: 1,
                    name: 'Tags',
                    path: '/tags',
                  },
                  {
                    type: 'ListItem',
                    position: 2,
                    name: tag.name || '',
                  },
                ],
              },
            ]),
          }}
        />
      </Head>
      <section>
        <PageTitle title={`Posts of ${tag.name}`} />
        <PostCardList posts={postList.contents} />
      </section>
      <PaginationLinks
        currentPage={currentPage}
        totalPage={Math.ceil(postList.totalCount / PER_PAGE)}
        prefix={`/tags/${tag.id}/page/`}
      />
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export const getStaticProps: GetStaticProps<StaticProps> = async ({
  params,
}) => {
  if (!params?.tagid) {
    throw new Error('Error: invalid tagid');
  }
  if (!params?.page || typeof params.page !== 'string') {
    throw new Error('Error: invalid page number');
  }
  const page = strToInteger(params.page);
  if (!page) {
    throw new Error('Error: invalid page number');
  }
  const tagId = toStringId(params.tagid);
  const tagPromise = microcmsClient.v1.tags._id(tagId).$get({
    query: {
      fields: 'id,name',
    },
  });
  const postListPromise = microcmsClient.v1.posts.$get({
    query: {
      fields: 'id,title,publishedAt,modifiedAt,tags',
      orders: '-publishedAt',
      limit: PER_PAGE,
      offset: (page - 1) * PER_PAGE,
      filters: `tags[contains]${tagId}[and]isDraft[equals]false`,
    },
  });
  const [tag, postList] = await Promise.all([tagPromise, postListPromise]);
  return {
    props: { currentPage: page, tag, postList },
    revalidate: 60,
  };
};

export default Page;
