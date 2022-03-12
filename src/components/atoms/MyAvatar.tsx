import { Avatar } from '@mui/material';

const MyAvatar: React.FC = () => {
  return (
    <Avatar
      src='/logo.png'
      title='abekoh'
      alt="abekoh's icon"
      variant='square'
      sx={{ width: 64, height: 64 }}
    />
  );
};

export default MyAvatar;
