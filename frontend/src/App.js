import React from 'react';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Route, Switch, Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import RaceInfo from './raceInfo';
import DriversContainer from './driversContainer';
import SeasonsContainer from './seasonContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './driverInfo';
import { Container, Grid, IconButton, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Login from './login';

const App = ({ colorContext }) => {
  const theme = useTheme();
  const colorMode = React.useContext(colorContext);

  return (
    <Router>
      <Container maxWidth="l"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.default',
          color: 'text.primary'
        }}>
        <Grid container spacing={3} sx={{ marginTop:1 , marginBottom: 1,alignItems: 'center' }}>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={8}>
            <Link component={RouterLink} underline='hover' to="/">
              <Typography variant="h2" component="h1" color="main" sx={{ textAlign: 'center' }}>F1 HISTORY</Typography>
            </Link>
          </Grid>
          <Grid item xs={2}>
            <Link to='/login'>
            <Typography variant="h6">LOGIN</Typography>
            </Link>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

          </Grid>
        </Grid>
        <AppBar />

        <Switch>
          <Route path="/login" exact>
            <Login/>
          </Route>
          <Route path="/seasons/:year/:gp" exact>
            <RaceInfo />
          </Route>
          <Route path="/drivers" exact>
            <DriversContainer />
          </Route>
          <Route path="/drivers/:id" exact>
            <DriverInfo />
          </Route>
          <Route path="/seasons/:year" exact>
            <SeasonsContainer />
          </Route>
          <Route exact path="/seasons/" exact>
            <SeasonsContainer />
          </Route>
          <Route path="/" exact>
            <SeasonsContainer />
          </Route>
        </Switch>
      </Container >
    </Router>
  );
};

export default App;