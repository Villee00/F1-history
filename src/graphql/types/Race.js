import { gql } from "apollo-server";

const typeDefs = gql`
  type Race {
    id: ID!
    date: String!
    circuit: String!
    grandPrix: String!
    pictureLink: String!
  }
`;

const resolvers = {};

export default { typeDefs, resolvers };
