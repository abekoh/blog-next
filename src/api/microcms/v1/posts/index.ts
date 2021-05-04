import { GetListContentsQuery } from '../../../../types/api';
import { PostListResponse } from '../../../../types/post';

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: PostListResponse;
  };
};
