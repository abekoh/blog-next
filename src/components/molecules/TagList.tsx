import { Box, Chip, Icon, makeStyles } from '@material-ui/core';
import { FunctionComponent } from 'react';

import { TagResponse } from '../../types/tag';
import Link from '../utils/Link';

const useStyles = makeStyles(() => ({
  tag: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
}));

type Props = {
  tags: TagResponse[];
  linkable?: boolean;
};

const TagChip: React.FC<{ tag: TagResponse, linkable: boolean }> = ({ tag, linkable }) => {
  return <Chip
    icon={tag.icon ? <Icon className={tag.icon}></Icon> : undefined}
    label={tag.name}
    clickable={linkable}
  />
}

const TagList: React.FC<Props> = ({ tags, linkable = false }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" my={1}>
      {tags.map((tag) => (
        <Box key={tag.id} mr={0.5}>
          {linkable ?
            <Link href={`/tags/${tag.id}`} className={classes.tag}>
              <TagChip tag={tag} linkable={true} />
            </Link> :
            <TagChip tag={tag} linkable={false} />
          }
        </Box>
      ))}
    </Box>
  );
};

export default TagList;
