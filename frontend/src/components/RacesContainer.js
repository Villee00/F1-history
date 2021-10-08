import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { GET_SEASON_RACES_BASIC } from '../queries';
import RaceCard from './RaceCard';

const RacesContainer = () =>{
  const {year} = useParams();
  const {data, loading} = useQuery(GET_SEASON_RACES_BASIC,{
    variables:{
      SeasonYear: parseInt(year)
    }
  });

  if(loading){
    return(<div>
      Loading...
    </div>);
  }

  const races = data?.allRaces.races;
  
  if(!races){
    return(
      <div>
        Error loading data
      </div>
    );
  }
  return(
    <Container maxWidth="xl" >
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {races.map(race => 
          <Link key={race.id} to={`/race/${encodeURIComponent(race.grandPrix)}`}>
            <RaceCard race={race} />
          </Link>)}
      </Box>
    </Container>
  );
};

export default RacesContainer;