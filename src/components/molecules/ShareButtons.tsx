import { Box, Grid, makeStyles, Badge } from '@material-ui/core';
import { count } from 'node:console';
import {
  FacebookIcon,
  FacebookShareButton,
  FacebookShareCount,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

import { siteData } from '../../data/site';

type Props = {
  url: string;
  title: string;
};

const useStyles = makeStyles(() => ({}));

const ICON_SIZE = 32;

const ShareButtonElements: React.FC<Props>[] = [
  ({ url, title }) => (
    <TwitterShareButton
      url={url}
      title={title}
      related={[`@${siteData.twitterUserName}`]}
    >
      <TwitterIcon size={ICON_SIZE} round />
    </TwitterShareButton>
  ),
  ({ url, title }) => (
    <FacebookShareButton url={url} title={title}>
      <FacebookIcon size={ICON_SIZE} round />
    </FacebookShareButton>
  ),
  ({ url, title }) => {
    const ShareButton = () => (
      <HatenaShareButton url={url} title={title}>
        <HatenaIcon size={ICON_SIZE} round />
      </HatenaShareButton>
    );
    return (
      <HatenaShareCount url={url}>
        {(shareCount) =>
          shareCount && shareCount > 0 ? (
            <Badge badgeContent={1} color="secondary">
              <ShareButton />
            </Badge>
          ) : (
            <ShareButton />
          )
        }
      </HatenaShareCount>
    );
  },
];

const ShareButtons: React.FC<Props> = ({ url, title }) => {
  const classes = useStyles();
  return (
    <>
      <Grid container display="flex" flexDirection="row" justifyContent="center" spacing={1}>
        {ShareButtonElements.map((Element, i) => {
          return (
            <Grid item key={i}>
              <Element url={url} title={title} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default ShareButtons;
