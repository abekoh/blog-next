import React from 'react';

import { Box, Pagination, PaginationItem } from '@mui/material';

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
    <Box display="flex" justifyContent="center" sx={{ margin: '0.3rem 0' }}>
      <Pagination
        size="large"
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
    </Box>
  );
};

export default PaginationLinks;
