import { useQuery } from '@apollo/client';
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

  const drivers = data?.getDriver;
  
  if(!drivers){
    return(
      <div>
        Error loading data
      </div>
    );
  }
  return(
    <div className="flex flex-row flex-wrap justify-center">
      {drivers.map(race => 
        <Link key={race.id} to={`/driver/${encodeURIComponent(race.grandPrix)}`}>
          <DriverCard driver={race} />
        </Link>)}
    </div>
  );
};

export default DriversContainer;