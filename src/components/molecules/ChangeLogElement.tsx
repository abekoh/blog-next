import React from 'react';

import { makeStyles, Typography, Paper } from '@material-ui/core';
import marked from 'marked';

import DateInfo from './DateInfo';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '1.2rem',
    margin: '1rem 0',
  },
  body: {
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
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <header>
        <DateInfo publishedAt={publishedAt} />
        <Typography variant="h5">{title}</Typography>
      </header>
      {description && (
        <section
          className={classes.body}
          dangerouslySetInnerHTML={{
            __html: marked(description),
          }}
        />
      )}
    </Paper>
  );
};

export default ChangeLogElement;
