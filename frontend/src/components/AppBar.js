import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';

const AppBar = () =>{
  const [value, setValue] = React.useState('seasons');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return(
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Seasons" value="seasons" to="/" component={Link}/>
            <Tab label="Drivers" value="drivers" to="/drivers" component={Link}/>
            <Tab label="Circuits" value="circuits" to="/circuits" component={Link}/>
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default AppBar;