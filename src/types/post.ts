import { ContentResponse, ListContentsResponse } from './api';
import { CategoryResponse } from './category';
import { TagResponse } from './tag';

export type PostListResponse = ListContentsResponse<PostResponse>;

export type PostResponse = ContentResponse<{
  title?: string;
  body?: string;
  htmlBody?: string;
  isHtml?: boolean;
  categories?: CategoryResponse[];
  tags?: TagResponse[];
  publishedAt?: Date;
}>;
