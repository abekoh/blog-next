import { Typography } from '@material-ui/core';

import { InterestedTagsResponse } from '../../types/interestedTags';
import TagList from '../molecules/TagList';

type Props = {
  interestedTags: InterestedTagsResponse;
};

const InterestedTags: React.FC<Props> = ({ interestedTags }) => {
  const subtitleVariant = 'subtitle1';
  return (
    <p>
      <Typography variant={subtitleVariant}>得意・よく使う</Typography>
      <TagList linkable tags={interestedTags.skillful || []} />
      <Typography variant={subtitleVariant}>使える・使う</Typography>
      <TagList linkable tags={interestedTags.canuse || []} />
      <Typography variant={subtitleVariant}>少しだけ・たまに使う</Typography>
      <TagList linkable tags={interestedTags.alittle || []} />
      <Typography variant={subtitleVariant}>まだ・使ってみたい</Typography>
      <TagList linkable tags={interestedTags.notouch || []} />
    </p>
  );
};

export default InterestedTags;
