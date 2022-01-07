import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const PageTabs = () =>{
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname.split('/')[1] == ''? 'seasons': location.pathname.split('/')[1]);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() =>{
    const value = location.pathname.split('/')[1] == ''? 'seasons': location.pathname.split('/')[1];
    if(value !== 'seasons' || value !== 'drivers')
      return;
    setValue(value);
  
  },[location]);
  
  return(
    <Box sx={{marginBottom:2}}>
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