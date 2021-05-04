import aspida from '@aspida/fetch';
import { Octokit } from '@octokit/rest';

import microcmsApi from '../api/microcms/$api';

const fetchConfig: Required<Parameters<typeof aspida>>[1] = {
  baseURL: process.env.MICRO_CMS_HOST,
  throwHttpErrors: true,
  headers: {
    'X-API-KEY': process.env.MICRO_CMS_API_KEY ?? '',
  },
};

export const microcmsClient = microcmsApi(aspida(fetch, fetchConfig));

export const githubClient = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'blog-next-client',
  timeZone: 'Japan',
});
