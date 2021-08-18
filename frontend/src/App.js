import React from 'react';
import AppBar from './components/AppBar';
import RacesContainer from './components/RacesContainer';

const App = () =>{

  return(
    <div className="flex flex-shrink-0 p-6 flex-col items-center">
      <p className="text-5xl font-bold font">F1</p>
      <AppBar/>
      <RacesContainer/>
    </div>
  );
};

export default App;