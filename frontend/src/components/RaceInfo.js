import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RACE } from '../queries';
import { Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ResultTable from './ResultTable';

const RaceInfo = () =>{
  const {gp} = useParams();
  const {data, loading} = useQuery(GET_RACE, {
    variables:{
      raceInfoGrandPrix: decodeURIComponent(gp)
    }
  });
  
  if(loading){
    return(
      <Typography>Loading...</Typography>
    );
  }

  const raceInfo = data?.raceInfo;
  if(!raceInfo){
    return(
      <Typography>No race found with that gp</Typography>
    );
  }
  return(
    <Container maxWidth="md" >
      <Box display="flex" flexDirection="column">
        <Box textAlign="center"> 
          <Typography variant="h2">{raceInfo.grandPrix}</Typography>
        </Box>
        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <Box >
            <img className="max-h-96" src={raceInfo.pictureLink}/>
          </Box>
          <Box>
        
            <Typography variant="subtitle1">{raceInfo.circuit.location}</Typography>
            <Typography variant="subtitle1">Laps: {raceInfo.laps}</Typography>
            <Typography variant="subtitle1">Weather: {raceInfo.weather}</Typography>
        
            <Typography variant="h6">Circuit</Typography>
            <Typography variant="subtitle1">{raceInfo.circuit.name}</Typography>
            <Typography variant="subtitle1">{raceInfo.circuit.length} km</Typography>
            <Typography variant="subtitle1">{raceInfo.circuit.capacity}K capacity</Typography>
          </Box>
        </Box>
        <Box>
          <ResultTable results={raceInfo.results}/>
        </Box>
      </Box>
    </Container>
  );
};

export default RaceInfo;