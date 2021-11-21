import { Avatar } from '@mui/material';

const MyAvatar: React.FC = () => {
  return (
    <Avatar
      src="/logo.png"
      title="abekoh"
      variant="square"
      sx={{ width: 64, height: 64 }}
    />
  );
};

export default MyAvatar;
