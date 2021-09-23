import { useQuery } from '@apollo/client';
import React from 'react';
import { Link } from 'react-router-dom';
import { GET_SEASON_RACES_BASIC } from '../queries';
import RaceCard from './RaceCard';

const DriversContainer = () =>{
  const {data, loading} = useQuery(GET_DRIVERS,{
    variables:{
      SeasonYear: 2000
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
    <div className="flex flex-row flex-wrap justify-center">
      {races.map(race => 
        <Link key={race.id} to={`/race/${encodeURIComponent(race.grandPrix)}`}>
          <RaceCard race={race} />
        </Link>)}
    </div>
  );
};

export default DriversContainer;