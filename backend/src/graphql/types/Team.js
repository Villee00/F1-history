import { gql } from "apollo-server";

const typeDefs = gql`
  type Team {
    id: ID!
    name: String!
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
