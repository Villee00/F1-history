import { gql } from "apollo-server";

const typeDefs = gql`
  type Races {
    race: Race
    position: Int
    grid: Int
  }
  type Driver {
    id: ID!
    driverNumber: [Int]
    seasonsDriven: [Int]
    teams: [String]
    firstName: String!
    lastName: String!
    nationality: String
    dateOfBirth: String
    races: [Races!]
    wikipediaLink: String!
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
