import {gql} from '@apollo/client';

const RACE_DETAILS = gql`
  fragment RaceDetails on Race {
    date
    circuit {
      location
      name
      length
      capacity
    }
    grandPrix
    pictureLink
    weather
    laps
  }
`;


export const GET_SEASON_RACES_BASIC = gql`
query Query($SeasonYear: Int!) {
  allRaces(seasonYear: $SeasonYear) {
    races {
      id
      date
      grandPrix
      weather
      pictureLink
    }
  }
}
`;

export const GET_RACE = gql`
query Query($raceInfoGrandPrix: String!) {
  raceInfo(grandPrix: $raceInfoGrandPrix) {
    ...RaceDetails
    results {
      driver {
        firstName
        lastName
        pictureLink
      }
      position
      grid
      positionsGained
    }
  }
}

${RACE_DETAILS}
`;

export const GET_RACE_WEATHER = gql`
query Query($RaceWeather: String) {
  filterRaces(weather: $RaceWeather) {
    id
    date
    grandPrix
    weather
    pictureLink
  }
}
${RACE_DETAILS}
`;

export const GET_DRIVERS = gql`
query Query {
  getDriver {
    id
    firstName
    lastName
    positionsGainedCareer
    racesDriven
    pictureLink
  }
}
`;