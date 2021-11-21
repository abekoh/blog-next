import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { TagResponse } from '../../types/tag';
import Link from '../utils/Link';
import DateInfo from './DateInfo';
import TagList from './TagList';

const PREFIX = 'PostCard';

const classes = {
  title: `${PREFIX}-title`,
  link: `${PREFIX}-link`,
  dateText: `${PREFIX}-dateText`,
};

const StyledLink = styled(Link)(() => ({
  [`& .${classes.title}`]: {},

  [`&.${classes.link}`]: {
    textDecoration: 'none',
  },

  [`& .${classes.dateText}`]: {
    color: grey[500],
  },
}));

type Props = {
  id: string;
  title: string;
  publishedAt: Date;
  modifiedAt?: Date;
  tags: TagResponse[];
};

const PostCard: React.FC<Props> = ({
  id,
  title,
  publishedAt,
  modifiedAt,
  tags,
}) => {
  return (
    <StyledLink href={`/posts/${id}`} className={classes.link}>
      <Card sx={{ display: 'flex' }}>
        <CardActionArea>
          <CardContent>
            <DateInfo publishedAt={publishedAt} modifiedAt={modifiedAt} />
            <Typography variant="h5">{title}</Typography>
            <TagList tags={tags} linkable={false} />
          </CardContent>
        </CardActionArea>
      </Card>
    </StyledLink>
  );
};

export default PostCard;
