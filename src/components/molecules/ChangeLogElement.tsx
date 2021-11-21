import React from 'react';

import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { marked } from 'marked';

import DateInfo from './DateInfo';

const PREFIX = 'ChangeLogElement';

const classes = {
  paper: `${PREFIX}-paper`,
  body: `${PREFIX}-body`,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
  [`&.${classes.paper}`]: {
    padding: '1.2rem',
  },

  [`& .${classes.body}`]: {
    '& p': {
      ...theme.typography.body1,
    },
    '& h1': {
      ...theme.typography.h4,
    },
    '& h2': {
      ...theme.typography.h5,
    },
    '& h3': {
      ...theme.typography.h6,
    },
  },
}));

type Props = {
  publishedAt: Date;
  title: string;
  description: string;
};

const ChangeLogElement: React.FC<Props> = ({
  publishedAt,
  title,
  description,
}) => {
  return (
    <StyledPaper className={classes.paper}>
      <header>
        <DateInfo publishedAt={publishedAt} />
        <Typography variant="h5">{title}</Typography>
      </header>
      {description && (
        <section
          className={classes.body}
          dangerouslySetInnerHTML={{
            __html: marked.parse(description),
          }}
        />
      )}
    </StyledPaper>
  );
};

export default ChangeLogElement;
