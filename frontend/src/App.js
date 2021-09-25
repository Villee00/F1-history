import React from 'react';
import AppBar from './components/AppBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RaceInfo from './components/RaceInfo';
import RacesContainer from './components/RacesContainer';
import DriversContainer from './components/DriversContainer';
import SeasonsContainer from './components/SeasonContainer';

const App = () =>{
  return(
    <Router>
      <div className="flex flex-shrink-0 p-6 flex-col items-center">
        <AppBar/>

        <Switch>
          <Route path="/race/:gp">
            <RaceInfo/>
          </Route>
          <Route path="/:year">
            <RacesContainer/>
          </Route>
          <Route path="/drivers">
            <DriversContainer/>
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