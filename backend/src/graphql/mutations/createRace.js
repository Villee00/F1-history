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
    createRace(season: Int): String
  }
`;

// TODO: Autentikointi
const resolvers = {
  Mutation: {
    createRace: async (obj, args) => {
      await addSeason(args.season);

      return "Done";
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
