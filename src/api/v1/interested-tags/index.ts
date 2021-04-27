import { GetContentsQuery } from '../../../types/api';
import { InterestedTagsResponse } from '../../../types/interestedTags';

export type Methods = {
  get: {
    query?: GetContentsQuery;
    resBody: InterestedTagsResponse;
  };
};
