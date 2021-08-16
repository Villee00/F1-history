import { gql } from "apollo-server";
import Season from "../../models/season.js";

export const typeDefs = gql`
  extend type Query {
    allRaces(seasonYear: Int!): Season
  }
`;

export const resolvers = {
  Query: {
    allRaces: async (root, args) => {
      const season = await Season.findOne({
        year: args.seasonYear,
      }).populate("races");

      season.races.forEach((race) => {
        race.populate("circuit");
      });

      return season;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
