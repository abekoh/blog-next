import { Box, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { dateToString } from '../../utils/dateToString';

const useStyles = makeStyles(() => ({
  dateIcon: {
    color: grey[500],
  },
  dateText: {
    color: grey[500],
    marginRight: '0.6rem',
  },
}));

type Props = {
  publishedAt: Date;
  modifiedAt?: Date;
};

const DateInfo: React.FC<Props> = ({ publishedAt, modifiedAt }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row">
      <Typography className={classes.dateText}>
        <time dateTime={publishedAt.toString()}>
          {dateToString(publishedAt)}
        </time>
      </Typography>
      {modifiedAt && (
        <Typography className={classes.dateText}>
          <time dateTime={modifiedAt.toString()}>
            (updated: {dateToString(modifiedAt)})
          </time>
        </Typography>
      )}
    </Box>
  );
};

export default DateInfo;
