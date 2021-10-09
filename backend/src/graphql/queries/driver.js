import { gql } from "apollo-server";
import Driver from "../../models/driver.js";

export const typeDefs = gql`
  extend type Query {
    getDrivers: [Driver!]!
    getDriver(driverID: String!): Driver!
  }
`;

export const resolvers = {
  Query: {
    getDrivers: async (obj, args, context, info) => {
      return await Driver.find({});
    },
    getDriver: async (obj, args, context, info) => {
      return await Driver.findById(args.driverID).populate({
        path: "races.race",
        model: "Race",
      });
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
