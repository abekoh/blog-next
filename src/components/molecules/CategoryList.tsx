import { Box, Chip, makeStyles } from '@material-ui/core';

import { CategoryResponse } from '../../types/category';
import { TagResponse } from '../../types/tag';
import Link from '../utils/Link';

const useStyles = makeStyles((theme) => ({
  category: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

type Props = {
  categories: CategoryResponse[];
};

const CategoryList: React.FC<Props> = ({ categories }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" p={1}>
      {categories.map((category) => (
        <Box key={category.id} mx={0.5}>
          <Link href={`/tags/${category.id}`} className={classes.category}>
            <Chip label={category.name} clickable />
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default CategoryList;
