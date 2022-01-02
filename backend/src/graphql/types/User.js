import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    name: String!
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
