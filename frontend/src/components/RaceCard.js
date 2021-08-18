/* eslint-disable react/prop-types */
import React from 'react';

const RaceCard = ({race}) =>{

  const date = new Date(race.date);
  return(
    <div className="max-w-xs rounded overflow-hidden shadow-lg p-5">
      <div className="w-full max-w-sm h-56">
        <img className="max-h-56" src={race.pictureLink}/>
      </div>
      <div className="px-6 py-4">
        <p className="font-bold">{race.grandPrix}</p>
        <p className="">{race.grandPrix}</p>
      </div>
      <div className="flex-row flex space-x-3 justify-around">
        <p>{date.toDateString()}</p>
        <p>{race.weather}</p>
      </div>
    </div>
  );
};

export default RaceCard;