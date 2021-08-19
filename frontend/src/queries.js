import {gql} from '@apollo/client';

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
}
`;