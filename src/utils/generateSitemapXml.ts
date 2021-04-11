import { PostResponse } from '../types/post';
import { client } from './api';

const appHost = process.env.HOST || '';

export const generateSitemapXml: () => Promise<string> = async () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const postsPromise = client.v1.posts.$get({
    query: {
      fields: 'id,publishedAt',
      orders: '-publishedAt',
    },
  });
  const [postList] = await Promise.all([postsPromise]);
  postList.contents.forEach((post: PostResponse) => {
    xml += `
      <url>
        <loc>${appHost}/posts/${post.id}</loc>
        <lastmod>${post.publishedAt}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};
