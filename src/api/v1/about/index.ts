import { AboutListResponse } from '../../../types/about';
import { GetListContentsQuery } from '../../../types/api';

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: AboutListResponse;
  };
};
