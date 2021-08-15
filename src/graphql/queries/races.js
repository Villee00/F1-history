import { gql } from "apollo-server";
import Race from "../../models/race.js";

export const typeDefs = gql`
  extend type Query {
    allRaces(seasonYear: Int!): [Race!]!
  }
`;

export const resolvers = {
  Query: {
    allRaces: async (root, args) => {
      const races = await Race.find({
        date: {
          $gte: new Date(2020, 1, 1),
          $lt: new Date(2021, 12, 1),
        },
      }).populate("circuit");

      return races;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
