import { ContentResponse } from './api';

export type SiteDataResponse = ContentResponse<{
  title: string;
  author: string;
  copyright: string;
}>;
