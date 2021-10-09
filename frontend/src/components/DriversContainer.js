import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
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