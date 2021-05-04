import { GetContentsQuery } from '../../../../../types/api';
import { CategoryResponse } from '../../../../../types/category';

export type Methods = {
  get: {
    query?: GetContentsQuery;
    resBody: CategoryResponse;
  };
};
