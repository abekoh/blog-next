import { GetContentsQuery } from '../../../../../types/api';
import { TagResponse } from '../../../../../types/tag';

export type Methods = {
  get: {
    query?: GetContentsQuery;
    resBody: TagResponse;
  };
};
