import { ContentResponse, ListContentsResponse } from './api';

export type AboutListResponse = ListContentsResponse<AboutResponse>;

export type AboutResponse = ContentResponse<{
  order: number;
  title: string;
  body?: string;
}>;
