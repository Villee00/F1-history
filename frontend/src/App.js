import React from 'react';
import AppBar from './components/AppBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RaceInfo from './components/RaceInfo';
import RacesContainer from './components/RacesContainer';
import DriversContainer from './components/DriversContainer';
import SeasonsContainer from './components/SeasonContainer';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import DriverInfo from './components/DriverInfo';

const App = () =>{
  return(
    <Router>
      <div className="flex flex-shrink-0 p-6 flex-col items-center">
        <AppBar/>

        <Switch>
          <Route path="/race/:gp">
            <RaceInfo/>
          </Route>
          <Route path="/season/:year">
            <RacesContainer/>
          </Route>
          <Route path="/drivers">
            <DriversContainer/>
          </Route>
          <Route path="/driver/:id">
            <DriverInfo/>
          </Route>
          <Route exact path="/seasons">
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