import { useQuery } from '@apollo/client';
import { Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { GET_DRIVERS } from '../queries';
import DriverCard from './DriverCard';

const DriversContainer = () =>{
  const {data, loading} = useQuery(GET_DRIVERS);

  if(loading){
    return(<div>
      Loading...
    </div>);
  }

  const drivers = data?.getDrivers;
  
  if(!drivers){
    return(
      <div>
        Error loading data
      </div>
    );
  }
  return(
    <Container maxWidth="xl" >
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="space-evenly">
        <TextField id="standard-basic" label="Standard" variant="standard" />
        <FormControl sx={{minWidth:200}}>
          <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {drivers.map(driver => 
          <Link key={driver.id} to={`/driver/${driver.id}`}>
            <DriverCard driver={driver} />
          </Link>)}
      </Box>
    </Container>
  );
};

export default DriversContainer;