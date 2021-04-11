import React from 'react';

import { makeStyles, Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: '1.8rem',
    margin: '1rem 0',
  },
  body: {
    ...theme.typography.body1,
    '& h1': {
      ...theme.typography.h4,
    },
    '& h2': {
      ...theme.typography.h5,
    },
    '& img': {
      maxWidth: '80%',
    },
  },
}));

type Props = {
  title: string;
  body: string;
};

const About: React.FC<Props> = ({ title, body }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <header>
        <Typography variant="h4">{title}</Typography>
      </header>
      <section
        className={classes.body}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
    </Paper>
  );
};

export default About;
