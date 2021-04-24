import info from '../data/info.json';
import { PostResponse } from '../types/post';
import { TagResponse } from '../types/tag';
import { client } from './api';

const APP_HOST = process.env.HOST || '';

const EXTRA_PATHS = ['/about', '/tags'];

export const generateSitemapXml: () => Promise<string> = async () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  const postsPromise = client.v1.posts.$get({
    query: {
      fields: 'id,publishedAt,modifiedAt',
      orders: '-publishedAt',
      limit: 200, // FIXME: totalページングでとる
    },
  });
  const tagsPromise = client.v1.tags.$get({
    query: {
      fields: 'id',
      limit: 1000, // FIXME: totalページングでとる
    },
  });
  const [postList, tagList] = await Promise.all([postsPromise, tagsPromise]);

  postList.contents.forEach((post: PostResponse) => {
    xml += `
      <url>
        <loc>${APP_HOST}/posts/${post.id}</loc>
        <lastmod>${
          post.modifiedAt ? post.modifiedAt : post.publishedAt
        }</lastmod>
      </url>
    `;
  });

  tagList.contents.forEach((tag: TagResponse) => {
    xml += `
      <url>
        <loc>${APP_HOST}/tags/${tag.id}</loc>
      </url>
    `;
  });

  // 最新記事
  const latestLastMod =
    postList.contents.length > 0
      ? `<lastmod>${postList.contents[0].publishedAt}</lastmod>`
      : undefined;
  xml += `
      <url>
        <loc>${APP_HOST}/posts</loc>
        ${latestLastMod}
      </url>
  `;

  // Home
  xml += `
      <url>
        <loc>${APP_HOST}</loc>
        ${info.updatedOn ? `<lastmod>${info.updatedOn}</lastmod>` : ''}
      </url>
  `;

  EXTRA_PATHS.forEach((path: string) => {
    xml += `
      <url>
        <loc>${APP_HOST}${path}</loc>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};
