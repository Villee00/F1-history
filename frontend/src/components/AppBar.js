import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const AppBar = () =>{
  return(
    <div>
      <Link to="/">
        <p className="text-5xl font-bold font text-center">F1</p>
      </Link>
      <Paper className="flex-grow-1">
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          centered>
          <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 " label="Seasons"/>
          <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 " label="Circuits"/>
          <Tab className="p-3 bg-gray-500 bg-opacity-10 rounded m-5 " label="Drivers"/>
        </Tabs>
      </Paper>
    </div>
  );
};

export default AppBar;