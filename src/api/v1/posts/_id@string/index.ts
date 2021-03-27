import { GetContentsQuery } from '../../../../types/api';
import { PostResponse } from '../../../../types/post';

export type Methods = {
  get: {
    query?: GetContentsQuery;
    resBody: PostResponse;
  };
};
