import RSS from 'rss';

import { siteData } from '../data/site';
import { microcmsClient } from './api';

export const generateFeedXml: () => Promise<string> = async () => {
  const feed = new RSS({
    title: siteData.title,
    description: siteData.description,
    site_url: siteData.host,
    feed_url: `${siteData.host}/feed`,
    language: 'ja',
  });

  const posts = await microcmsClient.v1.posts.$get({
    query: {
      fields: 'id,title,summary,publishedAt',
      filters: `isDraft[equals]false`,
      orders: '-publishedAt',
      limit: 200, // FIXME: totalページングでとる
    },
  });

  posts.contents.forEach((post) => {
    if (!post.title) {
      return;
    }
    feed.item({
      title: post.title,
      description: post.summary || '',
      date: post.publishedAt,
      url: `${siteData.host}/posts/${post.id}`,
    });
  });

  return feed.xml();
};
