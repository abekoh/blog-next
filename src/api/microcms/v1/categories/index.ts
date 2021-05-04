import { GetListContentsQuery } from '../../../../types/api';
import { CategoryListResponse } from '../../../../types/category';

export type Methods = {
  get: {
    query?: GetListContentsQuery;
    resBody: CategoryListResponse;
  };
};
