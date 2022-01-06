import React, { useState } from 'react';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RaceInfo from './pages/raceInfo';
import DriversContainer from './pages/driversContainer';
import SeasonsContainer from './pages/seasonContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './pages/driverInfo';
import Login from './pages/login';
import { Container } from '@mui/material';
import Notification from './components/Notification';
import UserPage from './pages/userPage';

const App = ({ colorContext }) => {
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
        <Notification/>
        <AppBar colorContext={colorContext} />
        <Switch>
          <Route path="/login" exact>
            <Login />
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
          <Route path="/seasons/" exact>
            <SeasonsContainer />
          </Route>
          <Route path="/:username" exact>
            <UserPage/>
          </Route>
          <Route path="/" exact>
            <SeasonsContainer />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
};

export default App;