import { Grid, GridSize } from '@mui/material';

import { ReleaseInfo } from '../../types/release';
import ChangeLogElement from '../molecules/ChangeLogElement';

type Props = {
  changeLogElements: ReleaseInfo[];
  pickuped?: boolean;
};

const ChangeLogList: React.FC<Props> = ({
  changeLogElements,
  pickuped = false,
}) => {
  const gridItemProp: {
    xs?: GridSize;
    sm?: GridSize;
    md?: GridSize;
    lg?: GridSize;
    xl?: GridSize;
  } = pickuped ? { md: 4, sm: 6 } : { xs: 12 };
  return (
    <>
      <Grid container spacing={1} justifyContent="flex-start">
        {changeLogElements.map((releaseInfo, i) => (
          <Grid item key={i} {...gridItemProp}>
            <ChangeLogElement
              publishedAt={releaseInfo.publishedAt}
              title={releaseInfo.title}
              description={releaseInfo.description}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ChangeLogList;
