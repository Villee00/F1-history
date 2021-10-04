import { gql } from "apollo-server";

const typeDefs = gql`
  type Results {
    driver: Driver
    position: Int
    grid: Int
  }
  type Race {
    id: ID!
    date: String!
    circuit: Circuit
    grandPrix: String!
    pictureLink: String
    weather: String!
    laps: Int!
    results: [Results!]
  }
`;

const resolvers = {
  Race: {},
};

export default { typeDefs, resolvers };
