import { gql } from "apollo-server";

const typeDefs = gql`
  type Season {
    id: ID!
    year: Int!
    races: [Race!]
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
