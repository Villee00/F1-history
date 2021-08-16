import { gql } from "apollo-server";
import { addSeason } from "../../utils/wikipediaApiHelper.js";

const typeDefs = gql`
  input createRaceInput {
    date: Int
    circuitName: String
    grandPrix: String
    pictureLink: String
  }
  extend type Mutation {
    createRace(race: String): String
  }
`;

// TODO: Autentikointi
const resolvers = {
  Mutation: {
    createRace: async (obj, args) => {
      await addSeason();

      return "Done";
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
