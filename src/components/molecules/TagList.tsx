import { FunctionComponent } from 'react';

import { Box, Chip, Grid, Icon, makeStyles } from '@material-ui/core';

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
    <Grid container direction="row" my={1} spacing={1}>
      {tags.map((tag) => (
        <Grid item key={tag.id}>
          {linkable ?
            <Link href={`/tags/${tag.id}`} className={classes.tag}>
              <TagChip tag={tag} linkable={true} />
            </Link> :
            <TagChip tag={tag} linkable={false} />
          }
        </Grid>
      ))}
    </Grid>
  );
};

export default TagList;
