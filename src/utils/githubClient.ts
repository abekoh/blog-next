import { Octokit } from '@octokit/rest';

import { githubData } from '../data/github';
import { ReleaseInfo } from '../types/release';

export const githubClient = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  userAgent: 'blog-next-client',
  timeZone: 'Japan',
});

export const getReleaseInfo: () => Promise<ReleaseInfo[]> = async () => {
  const releases = await githubClient.rest.repos.listReleases({
    owner: githubData.owner,
    repo: githubData.blogRepository,
  });
  if (releases.status !== 200) {
    return [];
  }
  const releaseInfoList: ReleaseInfo[] = releases.data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((release: any) => {
      return {
        publishedAt: release.published_at,
        title: release.name,
        description: release.body,
      };
    })
    .sort((e1, e2) => {
      if (e1.publishedAt > e2.publishedAt) return -1;
      if (e1.publishedAt < e2.publishedAt) return 1;
      return 0;
    });
  return releaseInfoList;
};
