import { ContentResponse, ListContentsResponse } from "./api";
import { TagResponse } from "./tag";

export type PostListResponse = ListContentsResponse<PostResponse>;

export type PostResponse = ContentResponse<{
  title?: string;
  body?: string;
  tags?: TagResponse[];
}>;
