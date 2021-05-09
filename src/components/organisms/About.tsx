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
    '& table': {
      borderCollapse: 'collapse',
      display: 'block',
      overflow: 'auto',
      '& th, td': {
        border: `1px solid ${theme.palette.grey[300]}`,
        padding: '0.4rem',
      },
      '& th': {
        background: theme.palette.grey[100],
      },
      '& td': {
        background: theme.palette.common.white,
      },
    },
  },
}));

type Props = {
  title?: string;
  body?: string;
  children?: JSX.Element;
};

const About: React.FC<Props> = ({ title, body, children }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      {title && (
        <header>
          <Typography variant="h4">{title}</Typography>
        </header>
      )}
      {body && (
        <section
          className={classes.body}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        />
      )}
      {children && <section className={classes.body}>{children}</section>}
    </Paper>
  );
};

export default About;
