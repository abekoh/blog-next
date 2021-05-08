import React from 'react';

import {
  makeStyles,
  Typography,
  Paper,
  Card,
  Grid,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Box,
} from '@material-ui/core';

import Link from '../utils/Link';

const useStyles = makeStyles((theme) => ({}));

type Props = {
  title: string;
  body?: string;
  children?: JSX.Element;
};

const TopProfile: React.FC<Props> = ({ title, body, children }) => {
  const classes = useStyles();
  return (
    <Card sx={{ display: 'flex' }}>
      <CardMedia
        component="img"
        sx={{ width: 64, margin: '1.0rem' }}
        image="/logo.png"
        title="hoge"
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CardContent>
          <Typography>
            abekohが雑多に技術メモを書いていくブログです。たまに技術以外のことも書くかも。
          </Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link href="/about">
            <Button size="small">{'>>'} More</Button>
          </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default TopProfile;
