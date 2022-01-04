import React, { useState } from 'react';
import AppBar from './components/AppBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RaceInfo from './raceInfo';
import DriversContainer from './driversContainer';
import SeasonsContainer from './seasonContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './driverInfo';
import Login from './login';
import { Container } from '@mui/material';
import Notification from './components/Notification';

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
          <Route exact path="/seasons/" exact>
            <SeasonsContainer />
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