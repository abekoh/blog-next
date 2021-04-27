import { ContentResponse, ListContentsResponse } from './api';
import { CategoryResponse } from './category';
import { TagResponse } from './tag';

export type PostListResponse = ListContentsResponse<InterestedTagsResponse>;

export type InterestedTagsResponse = ContentResponse<{
  skillful?: TagResponse[];
  canuse?: TagResponse[];
  alittle?: TagResponse[];
  notouch?: TagResponse[];
}>;
