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
  Avatar,
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
    <Card>
      <Grid container>
        <Grid
          item
          xs={12}
          md={2}
          sx={{ display: 'flex', justifyContent: 'center' }}
        >
          <Box sx={{ padding: '1.0rem' }}>
            <Avatar
              src="/logo.png"
              title="abekoh"
              variant="square"
              sx={{ width: 64, height: 64 }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={10}>
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
            <CardActions
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Link href="/about">
                <Button size="small">{'>>'} More</Button>
              </Link>
            </CardActions>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TopProfile;
