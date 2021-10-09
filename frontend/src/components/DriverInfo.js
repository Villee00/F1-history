import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_DRIVER } from '../queries';
import { Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DriverTable from './DriverTable';
import DriverRacesTable from './DriverRacesTable';

const DriverInfo = () =>{
  const {id} = useParams();
  const {data, loading} = useQuery(GET_DRIVER, {
    variables:{
      getDriverDriverId: id
    }
  });
  
  if(loading){
    return(
      <Typography>Loading...</Typography>
    );
  }

  const driverInfo = data?.getDriver;
  if(!driverInfo){
    return(
      <Typography>No driver found with that id</Typography>
    );
  }

  
  return(
    <Container maxWidth="md" >
      <Box display="flex" flexDirection="column">
        <Box textAlign="center"> 
          <Typography variant="h2">{driverInfo.fullName}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-evenly" flexWrap="wrap" sx={{placeItems:'flex-start'}}>
          <Paper elevation={3}>
            <img className="max-h-96 min-h-96" src={driverInfo.pictureLink}/>
          </Paper>
          <DriverTable driver={driverInfo}/>
        </Box>
        <Box>
          <DriverRacesTable races={driverInfo.races}/>
        </Box>
      </Box>
    </Container>
  );
};

export default DriverInfo;