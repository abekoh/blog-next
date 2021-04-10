import { Box, Chip, Icon, makeStyles } from '@material-ui/core';

import { TagResponse } from '../../types/tag';
import Link from '../utils/Link';

const useStyles = makeStyles((theme) => ({
  tag: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

type Props = {
  tags: TagResponse[];
};

const TagList: React.FC<Props> = ({ tags }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" p={1}>
      {tags.map((tag) => (
        <Box key={tag.id} mx={0.5}>
          <Link href={`/tags/${tag.id}`} className={classes.tag}>
            <Chip
              icon={<Icon className="devicon-java-plain"></Icon>}
              label={tag.name}
              clickable
            />
          </Link>
        </Box>
      ))}
    </Box>
  );
};

export default TagList;
