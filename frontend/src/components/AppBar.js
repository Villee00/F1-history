import { useTheme } from '@emotion/react';
import { Button, Container, Grid, IconButton, Link, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import React from 'react'
import useUserToken from '../hooks/useUserToken';
import PageTabs from './PageTabs'

const AppBar = ({ colorContext }) => {
  const theme = useTheme();
  const colorMode = React.useContext(colorContext);
  const { state: { token }, dispatch } = useUserToken();

  const logout = () => {
    dispatch({ type: "remove" });
    localStorage.removeItem('f1history-token')
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
            <Button component={RouterLink} underline='hover' to="/">
              Your page
            </Button>
          </Grid>
          <Grid item xs={8}>
            <Link component={RouterLink} underline='hover' to="/">
              <Typography variant="h2" component="h1" color="main" sx={{ textAlign: 'center' }}>F1 HISTORY</Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            {!token ?
              <Button component={RouterLink} to='/login'>
                <Typography variant="h6">LOGIN</Typography>
              </Button> :
              <Button onClick={() => logout()}>
                <Typography variant="h6">LOG OUT</Typography>
              </Button>}
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

          </Grid>
        </Grid>
        <PageTabs />
      </Container >
  )
}

export default AppBar
