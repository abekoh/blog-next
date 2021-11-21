import { Chip, Grid, Icon } from '@mui/material';
import { styled } from '@mui/material/styles';

import { TagResponse } from '../../types/tag';
import Link from '../utils/Link';

const PREFIX = 'TagList';

const classes = {
  tag: `${PREFIX}-tag`,
};

const StyledGrid = styled(Grid)(() => ({
  [`& .${classes.tag}`]: {
    textDecoration: 'none',
  },
}));

type Props = {
  tags: TagResponse[];
  linkable?: boolean;
};

const TagChip: React.FC<{ tag: TagResponse; linkable: boolean }> = ({
  tag,
  linkable,
}) => {
  return (
    <Chip
      icon={tag.icon ? <Icon className={tag.icon}></Icon> : undefined}
      label={tag.name}
      clickable={linkable}
    />
  );
};

const TagList: React.FC<Props> = ({ tags, linkable = false }) => {
  return (
    <StyledGrid container direction="row" my={1} spacing={1}>
      {tags.map((tag) => (
        <Grid item key={tag.id}>
          {linkable && !tag.noRef ? (
            <Link href={`/tags/${tag.id}`} className={classes.tag}>
              <TagChip tag={tag} linkable={true} />
            </Link>
          ) : (
            <TagChip tag={tag} linkable={false} />
          )}
        </Grid>
      ))}
    </StyledGrid>
  );
};

export default TagList;
