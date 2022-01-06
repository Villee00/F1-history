import { gql } from "apollo-server";

const typeDefs = gql`
  type Favorites {
    races: [Race]
    drivers: [Driver]
  }
  type User {
    id: ID!
    username: String!
    name: String!
    favorites: Favorites
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
