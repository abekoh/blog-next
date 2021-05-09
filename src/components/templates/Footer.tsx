import React from 'react';

import { AppBar, Grid, Icon, makeStyles, Typography } from '@material-ui/core';

import { siteData } from '../../data/site';
import Link from '../utils/Link';

const useStyles = makeStyles((theme) => ({
  appbar: {
    top: 'auto',
    bottom: 0,
  },
  externalLinkIcon: {
    color: theme.palette.primary.contrastText,
    boxSizing: 'content-box',
    fontSize: '1.2rem',
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: 7,
  },
  rotateZ: {
    transition: '.5s',
    '&:hover': {
      transform: 'rotateZ(360deg)',
    },
  },
  privacy: {
    color: theme.palette.primary.contrastText,
    fontSize: '0.8rem',
    '&:hover': {
      textDecoration: 'underline',
      textUnderlinePosition: 'auto',
    },
  },
  rotateY: {
    transition: '.5s',
    '&:hover': {
      transform: 'rotateY(360deg)',
    },
  },
}));

type Props = {
  copyright: string;
};
const Footer: React.FC<Props> = ({ copyright }) => {
  const classes = useStyles();
  return (
    <footer>
      <AppBar position="relative" className={classes.appbar}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid item>
            <Link href={`https://twitter.com/${siteData.twitterUserName}`}>
              <Icon
                className={`devicon-twitter-original ${classes.externalLinkIcon}`}
              />
            </Link>
          </Grid>
          <Grid item>
            <Link href={`https://github.com/${siteData.githubUserName}`}>
              <Icon
                className={`devicon-github-original ${classes.externalLinkIcon}`}
              />
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center" spacing={1}>
          <Grid item>
            <Link href={`/changelog`}>
              <Typography className={classes.privacy}>Changelog</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`/feed`}>
              <Typography className={classes.privacy}>RSS</Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`/privacy`}>
              <Typography className={classes.privacy}>
                Privacy Policy
              </Typography>
            </Link>
          </Grid>
          <Grid item>
            <Link href={`/contact`}>
              <Typography className={classes.privacy}>Contact</Typography>
            </Link>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography>{copyright}</Typography>
          </Grid>
        </Grid>
      </AppBar>
    </footer>
  );
};

export default Footer;
