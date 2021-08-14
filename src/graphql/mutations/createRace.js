import { gql } from "apollo-server";

const typeDefs = gql`
  input createRaceInput {
    date: Int
    circuiteName: String
    grandPrix: String
    pictureLink: String
  }
  extend type Mutation {
    createRace(race: createRaceInput!): String
  }
`;

// TODO: Autentikointi
const resolvers = {
  Mutation: {
    createRace: async (obj, args) => {},
  },
};

export default {
  typeDefs,
  resolvers,
};
