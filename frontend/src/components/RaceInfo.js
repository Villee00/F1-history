import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RACE } from '../queries';
import { CircularProgress, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ResultTable from './ResultTable';
import RaceInfoTable from './RaceInfoTable';

const RaceInfo = () =>{
  const {gp} = useParams();
  const {data, loading} = useQuery(GET_RACE, {
    variables:{
      raceInfoGrandPrix: decodeURIComponent(gp)
    }
  });
  
  if(loading){
    return(
      <CircularProgress />
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
        <Box display="flex" flexDirection="row" justifyContent="space-evenly" flexWrap="wrap">
          <Box>
            <img className="w-96" src={raceInfo.pictureLink}/>
          </Box>
          <Box>
            <RaceInfoTable race={raceInfo}/>
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