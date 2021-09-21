import { gql } from "apollo-server";

const typeDefs = gql`
  type Race {
    id: ID!
    date: String!
    circuit: Circuit
    grandPrix: String!
    pictureLink: String
    weather: String!
    laps: Int!
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
