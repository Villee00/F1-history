import React from 'react';
import AppBar from './components/AppBar';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import RaceInfo from './components/RaceInfo';
import RacesContainer from './components/RacesContainer';
import DriversContainer from './components/DriversContainer';
import SeasonsContainer from './components/SeasonContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './components/DriverInfo';
import { Typography } from '@mui/material';

const App = () =>{
  return(
    <Router>
      <div className="flex flex-shrink-0 p-6 flex-col items-center">
        <Link to="/">
          <Typography variant="h1" sx={{ fontStyle: 'oblique',fontWeight: 'bold' }}>F1</Typography>
        </Link>
        <AppBar/>

        <Switch>
          <Route path="/seasons/:year/:gp" exact>
            <RaceInfo/>
          </Route>
          <Route path="/seasons/:year">
            <RacesContainer/>
          </Route>
          <Route path="/drivers" exact>
            <DriversContainer/>
          </Route>
          <Route path="/drivers/:id" exact>
            <DriverInfo/>
          </Route>
          <Route  path="/seasons" exact>
            <SeasonsContainer/>
          </Route>
          <Route exact path="/">
            <SeasonsContainer/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;