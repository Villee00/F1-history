import { useQuery } from '@apollo/client';
import React from 'react';
import { GET_SEASON_RACES_BASIC } from '../queries';
import RaceCard from './RaceCard';

const RacesContainer = () =>{
  const {data, loading} = useQuery(GET_SEASON_RACES_BASIC,{
    variables:{
      SeasonYear: 2019
    }
  });

  if(loading){
    return(<div>
      Loading...
    </div>);
  }

  const races = data.allRaces.races;
  return(
    <div className="flex flex-row flex-wrap justify-center">
      {races.map(race => 
        <RaceCard race={race} key={race.id}/>)}
    </div>
  );
};

export default RacesContainer;