import React from 'react';

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  article: {
    '& p': {
      color: theme.palette.text.primary,
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
        <h2>{title}</h2>
      </header>
      <article
        className={classes.article}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      />
    </>
  );
};

export default Post;
