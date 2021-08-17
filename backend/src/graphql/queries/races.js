import { gql } from "apollo-server";
import Race from "../../models/race.js";
import Season from "../../models/season.js";

export const typeDefs = gql`
  extend type Query {
    allRaces(seasonYear: Int!): Season
    raceInfo(grandPrix: String!): Race
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
    raceInfo: async (root, args) => {
      const race = await Race.findOne({
        grandPrix: args.grandPrix,
      }).populate("circuit");

      return race;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
