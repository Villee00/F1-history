import { Container, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import useUserToken from '../hooks/useUserToken';
import PageTabs from './PageTabs';
import MainMenu from './MainMenu';
import useNotification from '../hooks/useNotifcation';
import Notification from './Notification';

const NavBar = ({ colorContext }) => {
  const { token, username, dispatch } = useUserToken();
  const { setSuccess } = useNotification();
  const onLogout = () => {
    dispatch({ type: 'remove' });
    localStorage.clear();
    setSuccess('Logout successfully!');
  };

  return (
    <Container
      maxWidth="l"
      component="nav"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Notification />

      <Grid
        container
        spacing={3}
        sx={{ marginTop: 1, marginBottom: 1, alignItems: 'center' }}
      >
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Link component={RouterLink} underline="hover" to="/">
            <Typography
              variant="h2"
              component="h1"
              color="main"
              sx={{ textAlign: 'center' }}
            >
              F1 HISTORY
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={2}>
          <MainMenu
            colorContext={colorContext}
            username={username}
            onLogout={onLogout}
            token={token}
          />
        </Grid>
      </Grid>
      <PageTabs />
    </Container>
  );
};

export default NavBar;
