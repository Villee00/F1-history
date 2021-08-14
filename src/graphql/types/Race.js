import { gql } from "apollo-server";

const typeDefs = gql`
  type Race {
    id: ID!
    date: String!
    circuite: String!
    grandPrix: String!
    pictureLink: String!
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
