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