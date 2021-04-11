import { Typography } from '@material-ui/core';

type Props = {
  title: string;
};

const PageTitle: React.FC<Props> = ({ title }) => {
  return (
    <>
      <Typography variant="h4" m={1.5}>
        {title}
      </Typography>
    </>
  );
};

export default PageTitle;
