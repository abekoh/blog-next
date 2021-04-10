import { Box, makeStyles, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

import { dateToString } from '../../utils/dateToString';

const useStyles = makeStyles((theme) => ({
  dateIcon: {
    color: grey[500],
  },
  dateText: {
    color: grey[500],
  },
}));

type Props = {
  publishedAt: Date;
};

const DateInfo: React.FC<Props> = ({ publishedAt }) => {
  const classes = useStyles();
  return (
    <Box display="flex" flexDirection="row" margin={1}>
      {/* <CalendarTodayIcon className={classes.dateIcon} /> */}
      <Typography className={classes.dateText}>
        <time dateTime={publishedAt.toString()}>
          {dateToString(publishedAt)}
        </time>
      </Typography>
    </Box>
  );
};

export default DateInfo;
