import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RACE } from '../queries';

const RaceInfo = () =>{
  const {gp} = useParams();
  const {data, loading} = useQuery(GET_RACE, {
    variables:{
      raceInfoGrandPrix: decodeURIComponent(gp)
    }
  });
  
  if(loading){
    return(
      <p>Loading...</p>
    );
  }

  const raceInfo = data?.raceInfo;
  if(!raceInfo){
    return(
      <p>No race found with that gp</p>
    );
  }
  return(
    <div className="flex flex-row">
      <div >
        <img className=" max-h-96" src={raceInfo.pictureLink}/>
      </div>
      <div>
        <p className="text-xl font-bold">{raceInfo.grandPrix}</p>
        <p className="text-sm">{raceInfo.circuit.location}</p>
        <p className="text-base pt-5">Laps: {raceInfo.laps}</p>
        <p>Weather: {raceInfo.weather}</p>
        
        <p>Circuit</p>
        <p>{raceInfo.circuit.name}</p>
        <p>{raceInfo.circuit.length} km</p>
        <p>{raceInfo.circuit.capacity}K capacity</p>
      </div>
    </div>
  );
};

export default RaceInfo;