import { Typography } from '@material-ui/core';

type Props = {
  title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Typography variant="h5" m={1.0}>
        {title}
      </Typography>
    </>
  );
};

export default PageTitle;
