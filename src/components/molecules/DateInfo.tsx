import { Box, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { dateToString } from '../../utils/dateToString';

const PREFIX = 'DateInfo';

const classes = {
  dateIcon: `${PREFIX}-dateIcon`,
  dateText: `${PREFIX}-dateText`,
};

const StyledBox = styled(Box)(() => ({
  [`& .${classes.dateIcon}`]: {
    color: grey[500],
  },

  [`& .${classes.dateText}`]: {
    color: grey[500],
    marginRight: '0.6rem',
  },
}));

type Props = {
  publishedAt: Date;
  modifiedAt?: Date;
};

const DateInfo: React.FC<Props> = ({ publishedAt, modifiedAt }) => {
  return (
    <StyledBox display="flex" flexDirection="row">
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
    </StyledBox>
  );
};

export default DateInfo;
