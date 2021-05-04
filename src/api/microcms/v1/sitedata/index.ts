import { GetContentsQuery } from '../../../../types/api';
import { SiteDataResponse } from '../../../../types/siteData';

export type Methods = {
  get: {
    query?: GetContentsQuery;
    resBody: SiteDataResponse;
  };
};
