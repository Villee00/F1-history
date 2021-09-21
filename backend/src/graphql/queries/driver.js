import { gql } from "apollo-server";
import Driver from "../../models/driver.js";

export const typeDefs = gql`
  extend type Query {
    getDriver(driverID: String): [Driver]
  }
`;

export const resolvers = {
  Query: {
    getDriver: async (root, args) => {
      if (args.driverID) {
        return await Driver.findOne({
          ID: args.driverID,
        }).populate({
          path: "races.race",
          model: "Race",
        });
      }
      return await Driver.find({});
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
