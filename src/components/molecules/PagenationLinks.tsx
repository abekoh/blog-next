import React from 'react';

import { Pagination, PaginationItem } from '@material-ui/core';

import Link from '../utils/Link';

type Props = {
  currentPage: number;
  totalPage: number;
  prefix: string;
};

const PaginationLinks: React.FC<Props> = ({
  currentPage,
  totalPage,
  prefix,
}) => {
  return (
    <>
      {totalPage > 1 && (
        <Pagination
          page={currentPage}
          count={totalPage}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              href={`${prefix}${item.page}`}
              {...item}
            />
          )}
        />
      )}
    </>
  );
};

export default PaginationLinks;
