import { gql } from "apollo-server";
import Driver from "../../models/driver.js";

export const typeDefs = gql`
  extend type Query {
    getDriver(driverID: String!): Driver
  }
`;

export const resolvers = {
  Query: {
    getDriver: async (root, args) => {
      const driver = await Driver.findOne({
        year: args.seasonYear,
      }).populate({
        path: "races.race",
        model: "Race",
      });

      return driver;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
