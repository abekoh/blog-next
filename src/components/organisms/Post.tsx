import React from 'react';

import { makeStyles } from '@material-ui/core';

// https://next.material-ui.com/customization/default-theme/#main-content
const useStyles = makeStyles((theme) => ({
  title: {
    fontSize: '2.2rem',
  },
  body: {
    '& h2': {
      fontSize: '2rem',
    },
    '& p': {
      ...theme.typography.body,
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
