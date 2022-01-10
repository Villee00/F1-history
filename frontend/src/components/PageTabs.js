import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const tabs = ['seasons', 'drivers'];

const PageTabs = () =>{
  const location = useLocation();
  const [value, setValue] = useState('');
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{
    const value = location.pathname.split('/')[1] == ''? 'seasons': location.pathname.split('/')[1];
    if(tabs.some(tab => value === tab))
      setValue(value);
    
  },[location]);

  useEffect(() =>{
    const locationTab = location.pathname.split('/')[1] == ''? 'seasons': location.pathname.split('/')[1];
    if(tabs.some(tab => tab === locationTab))
      setValue(locationTab);
    else
      setValue('seasons');
  }, []);
  
  if(value === '')
    return null;
  return(
    <Box sx={{mb:2}}>
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Seasons" value="seasons" to="/seasons" component={Link}/>
            <Tab label="Drivers" value="drivers" to="/drivers" component={Link}/>
          </TabList>
        </Box>
      </TabContext>
    </Box>
  );
};

export default PageTabs;