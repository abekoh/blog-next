import React, { useEffect } from 'react';

import { Typography, Box, makeStyles } from '@material-ui/core';
import Prism from 'prismjs';

import { CategoryResponse } from '../../types/category';
import { TagResponse } from '../../types/tag';
import CategoryList from '../molecules/CategoryList';
import DateInfo from '../molecules/DateInfo';
import TagList from '../molecules/TagList';

// https://next.material-ui.com/customization/default-theme/#main-content
const useStyles = makeStyles((theme) => ({
  title: {},
  body: {
    ...theme.typography.body1,
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
    '& img': {
      maxWidth: '100%',
    },
    '& code': {
      // ref: https://github.com/ocodia/okaidia-prismjs-theme/blob/master/okaidia.css
      textShadow: '0px 1px rgba(0,0,0,0.3)',
      fontFamily: "Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace",
      color: '#f8f8f2',
      backgroundColor: '#272822',
      border: 'solid 0.2em #272822',
      borderRadius: '0.3em',
    },
    '& pre code': {
      // codeのみに適用したCSSを解除
      all: 'unset',
    },
  },
}));

type Props = {
  title: string;
  body: string;
  publishedAt: Date;
  categories: CategoryResponse[];
  tags: TagResponse[];
};

const Post: React.FC<Props> = ({ title, body, publishedAt, tags }) => {
  const classes = useStyles();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <article>
      <header>
        <Box marginTop={4} marginBottom={4}>
          <DateInfo publishedAt={publishedAt} />
          <Typography variant="h3" className={classes.title}>
            {title}
          </Typography>
          <TagList tags={tags} />
        </Box>
      </header>
      <section
        className={classes.body}
        dangerouslySetInnerHTML={{
          __html: body,
        }}
      ></section>
    </article>
  );
};

export default Post;
