import { Box, Chip } from '@material-ui/core';

import { CategoryResponse } from '../../types/category';

type Props = {
  categories: CategoryResponse[];
};

const CategoryList: React.FC<Props> = ({ categories }) => {
  return (
    <Box display="flex" flexDirection="row" p={1}>
      {categories.map((category) => (
        <Box key={category.id} mx={0.5}>
          <Chip label={category.name} />
        </Box>
      ))}
    </Box>
  );
};

export default CategoryList;
