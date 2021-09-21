import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const AppBar = () =>{
  return(
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Tabs  centered>
        <Tab label="Seasons" />
        <Tab label="Drivers" />
        <Tab label="Circuits" />
      </Tabs>
    </Box>
  );
};

export default AppBar;