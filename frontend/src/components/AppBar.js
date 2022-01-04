import { useTheme } from '@emotion/react';
import { Button, Container, Grid, IconButton, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import React from 'react'
import useUserToken from '../hooks/useUserToken';
import PageTabs from './PageTabs'
import AvatarMenu from './AvatarMenu';
import useNotification from '../hooks/useNotifcation';

const AppBar = ({ colorContext }) => {
  const { state: { token }, dispatch } = useUserToken();
  const {setSuccess} = useNotification();
  const onLogout = () => {
    dispatch({ type: "remove" });
    localStorage.removeItem('f1history-token');
    setSuccess("Logout successully!");
  }

  return (
    <Container maxWidth="l"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.default',
          color: 'text.primary'
        }}>
        <Grid container spacing={3} sx={{ marginTop: 1, marginBottom: 1, alignItems: 'center' }}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <Link component={RouterLink} underline='hover' to="/">
              <Typography variant="h2" component="h1" color="main" sx={{ textAlign: 'center' }}>F1 HISTORY</Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <AvatarMenu colorContext={colorContext} onLogout={onLogout} token={token}/>
          </Grid>
        </Grid>
        <PageTabs />
      </Container >
  )
}

export default AppBar
