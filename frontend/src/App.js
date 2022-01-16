import React from 'react';
import NavBar from './components/NavBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RaceInfo from './pages/raceInfo';
import DriversContainer from './pages/driversContainer';
import SeasonsContainer from './pages/seasonSelectionField';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './pages/driverInfo';
import Login from './pages/login';
import { Container } from '@mui/material';
import UserPage from './pages/userPage';
import Footer from './components/Footer';

const App = ({ colorContext }) => {
  return (
    <Router>
      <NavBar colorContext={colorContext} />
      <Container maxWidth="l"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: 'background.default',
          color: 'text.primary'
        }}>


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
            <UserPage />
          </Route>
          <Route path="/" exact>
            <SeasonsContainer />
          </Route>
        </Switch>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;