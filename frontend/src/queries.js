import { gql } from '@apollo/client';

const RACE_DETAILS = gql`
  fragment RaceDetails on Race {
    id
    date
    circuit {
      location
      name
      length
      capacity
    }
    grandPrix
    picture {
      link
      author
      source
      description
      license
      licenseInfo
    }
    weather
    laps
  }
`;
const DRIVER_SMALL_DETAILS = gql`
  fragment DriverSmallDetails on Driver {
    id
    fullName
    positionsGainedCareer
    racesDriven
    picture {
      link
      author
      source
      description
      license
      licenseInfo
    }
  }
`;
const RACE_SMALL_DETAILS = gql`
  fragment RaceSmallDetails on Race {
    id
    date
    grandPrix
    weather
    picture {
      link
      author
      source
      description
      license
      licenseInfo
    }
  }
`;

export const GET_SEASON_RACES_BASIC = gql`
  query Query($SeasonYear: Int!) {
    allRaces(seasonYear: $SeasonYear) {
      races {
        ...RaceSmallDetails
      }
      wikipediaLink
      year
    }
  }
  ${RACE_SMALL_DETAILS}
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
          picture {
            link
          }
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
`;

export const GET_DRIVERS = gql`
  query Query($limit: Int, $offset: Int, $filters: Filters, $sort: Sorting) {
    getDrivers(limit: $limit, offset: $offset, filters: $filters, sort: $sort) {
      drivers {
        ...DriverSmallDetails
      }
      driverCount
    }
  }
  ${DRIVER_SMALL_DETAILS}
`;

export const GET_DRIVER = gql`
  query Query($getDriverDriverId: String!) {
    getDriver(driverID: $getDriverDriverId) {
      id
      picture {
        link
        author
        source
        description
        license
        licenseInfo
      }
      racesDriven
      wikipediaLink
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
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput) {
    createUser(input: $input) {
      username
      name
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      value
      user {
        username
        favorites {
          races {
            id
          }
          drivers {
            id
          }
        }
      }
    }
  }
`;
export const GET_USER = gql`
  query GetUser($username: String!) {
    getUser(username: $username) {
      username
      name
      favorites {
        races {
          ...RaceSmallDetails
        }
        drivers {
          ...DriverSmallDetails
        }
      }
    }
  }
  ${DRIVER_SMALL_DETAILS}
  ${RACE_SMALL_DETAILS}
`;

export const ADD_FAVORITE = gql`
  mutation AddFavorite($raceId: String, $driverId: String) {
    addFavorite(raceID: $raceId, driverID: $driverId) {
      name
      favorites {
        drivers {
          id
        }
        races {
          id
        }
      }
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query Me {
    me {
      favorites {
        races {
          id
        }
        drivers {
          id
        }
      }
    }
  }
`;
