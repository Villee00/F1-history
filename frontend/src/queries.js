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
    wikipediaLink
    year
  }
}
`;

export const GET_RACE = gql`
query Query($raceInfoGrandPrix: String!) {
  raceInfo(grandPrix: $raceInfoGrandPrix) {
    ...RaceDetails
    results {
      driver {
        id
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
query Query($limit: Int, $offset: Int, $filters: Filters, $sort: Sorting) {
  getDrivers(limit: $limit, offset: $offset, filters: $filters, sort: $sort) {
    drivers {
      id
      fullName
      positionsGainedCareer
      racesDriven
      pictureLink
    }
    driverCount
  }
}
`;

export const GET_DRIVER = gql`
query Query($getDriverDriverId: String!) {
  getDriver(driverID: $getDriverDriverId) {
    pictureLink
    racesDriven
    positionsGainedCareer
    fullName
    seasonsDriven
    teams {
      name
    }
    nationality
    dateOfBirth
    races {
      race {
        grandPrix
        weather
      }
      position
      grid
      positionsGained
    }
  }
}
`;

export const GET_DRIVER_FILTERS = gql`
query Query {
  getDriverFilters {
    id
    name
  }
}`;