import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { TagResponse } from '../../types/tag';
import Link from '../utils/Link';
import DateInfo from './DateInfo';
import TagList from './TagList';

const useStyles = makeStyles(() => ({
  title: {},
  link: {
    '&:hover': {
      textDecoration: 'none',
    },
  },
  dateText: {
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
  const classes = useStyles();
  return (
    <Link href={`/posts/${id}`} className={classes.link}>
      <Card sx={{ display: 'flex' }}>
        <CardActionArea>
          <CardContent>
            <DateInfo publishedAt={publishedAt} modifiedAt={modifiedAt} />
            <Typography variant="h5">{title}</Typography>
            <TagList tags={tags} linkable={false} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default PostCard;
