import React from 'react';
import AppBar from './components/AppBar';
import RacesContainer from './components/RacesContainer';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import RaceInfo from './components/RaceInfo';

const App = () =>{
  return(
    <Router>
      <div className="flex flex-shrink-0 p-6 flex-col items-center">
        <AppBar/>

        <Switch>
          <Route path="/race/:gp">
            <RaceInfo/>
          </Route>
          <Route path="/">
            <RacesContainer/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;