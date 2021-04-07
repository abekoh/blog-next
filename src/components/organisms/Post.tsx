import React from 'react';

import { makeStyles } from '@material-ui/core';

// https://next.material-ui.com/customization/default-theme/#main-content
const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h3,
  },
  body: {
    ...theme.typography.body,
    '& h1': {
      ...theme.typography.h3,
    },
    '& h2': {
      ...theme.typography.h4,
    },
    '& h3': {
      ...theme.typography.h5,
    },
    '& h4': {
      ...theme.typography.h6,
    },
    '& h5': {
      ...theme.typography.h7,
    },
    '& img': {
      maxWidth: '100%',
    },
  },
}));

type Props = {
  title: string;
  body: string;
};

const Post: React.FC<Props> = ({ title, body }) => {
  const classes = useStyles();
  return (
    <>
      <header>
        <h1 className={classes.title}>{title}</h1>
      </header>
      <article
        className={classes.body}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
    </>
  );
};

export default Post;
