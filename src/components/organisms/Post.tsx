import React from 'react';

import { makeStyles } from '@material-ui/core';

import { CategoryResponse } from '../../types/category';
import { TagResponse } from '../../types/tag';
import CategoryList from '../molecules/CategoryList';
import DateInfo from '../molecules/DateInfo';
import TagList from '../molecules/TagList';

// https://next.material-ui.com/customization/default-theme/#main-content
const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h3,
  },
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
  },
}));

type Props = {
  title: string;
  body: string;
  publishedAt: Date;
  categories: CategoryResponse[];
  tags: TagResponse[];
};

const Post: React.FC<Props> = ({
  title,
  body,
  publishedAt,
  categories,
  tags,
}) => {
  const classes = useStyles();
  return (
    <article>
      <header>
        <h1 className={classes.title}>{title}</h1>
        <DateInfo publishedAt={publishedAt} />
        <TagList tags={tags} />
        <CategoryList categories={categories} />
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
