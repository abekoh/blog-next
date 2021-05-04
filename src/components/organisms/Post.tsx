import React, { useEffect } from 'react';

import { Box, makeStyles, Paper, Typography, Divider } from '@material-ui/core';
import Prism from 'prismjs';

import { CategoryResponse } from '../../types/category';
import { TagResponse } from '../../types/tag';
import DateInfo from '../molecules/DateInfo';
import ShareButtons from '../molecules/ShareButtons';
import TagList from '../molecules/TagList';

// https://next.material-ui.com/customization/default-theme/#main-content
const useStyles = makeStyles((theme) => ({
  title: {
    ...theme.typography.h3,
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.9rem',
    },
  },
  paper: {
    paddingTop: '0.5rem',
    paddingBottom: '0.5rem',
    margin: '1rem 0',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '0.8rem',
      paddingRight: '0.8rem',
    },
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '1.8rem',
      paddingRight: '1.8rem',
    },
  },
  body: {
    '& p': {
      ...theme.typography.body1,
      lineHeight: 1.8,
    },
    '& ul': {
      lineHeight: 1.8,
    },
    '& ol': {
      lineHeight: 1.8,
    },
    '& h1': {
      ...theme.typography.h4,
      fontWeight: 700,
    },
    '& h2': {
      ...theme.typography.h5,
      fontWeight: 700,
    },
    '& h3': {
      ...theme.typography.h6,
      fontWeight: 600,
    },
    '& img': {
      maxWidth: '80%',
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
    '& table': {
      borderCollapse: 'collapse',
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
  divider: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
}));

type Props = {
  title: string;
  body: string;
  publishedAt: Date;
  modifiedAt?: Date;
  categories: CategoryResponse[];
  tags: TagResponse[];
  url: string;
};

const Post: React.FC<Props> = ({
  title,
  body,
  publishedAt,
  modifiedAt,
  tags,
  url,
}) => {
  const classes = useStyles();
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <Paper className={classes.paper}>
      <article>
        <header>
          <Box marginTop={4} marginBottom={4}>
            <Box margin={1}>
              <DateInfo publishedAt={publishedAt} modifiedAt={modifiedAt} />
            </Box>
            <Typography variant="h3" my={1} className={classes.title}>
              {title}
            </Typography>
            <TagList tags={tags} linkable={true} />
          </Box>
        </header>
        <section
          className={classes.body}
          dangerouslySetInnerHTML={{
            __html: body,
          }}
        ></section>
        <Divider className={classes.divider} />
        <footer>
          <ShareButtons url={url} title={title} />
        </footer>
      </article>
    </Paper>
  );
};

export default Post;
