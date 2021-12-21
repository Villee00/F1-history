import { gql } from "apollo-server";
import Driver from "../../models/driver.js";
import * as yup from 'yup'


export const typeDefs = gql`
  type Drivers{
    drivers: [Driver!]!
    driverCount: Int!
  }
  input Filters{
    name: String
    team: String
    year: Int
  }
  extend type Query {
    getDrivers(limit: Int, offset: Int, filters: Filters): Drivers!
    getDriver(driverID: String!): Driver!
    getDriverCount: Int!
    getDriverFilters: DriverFilter!
  }
`;

const argsSchema = yup.object({
  limit: yup.number().default(10),
  offset: yup.number(),
  filters: yup.object().shape({
    name: yup.string(),
    team: yup.string(),
    year: yup.number()
  })
})

export const resolvers = {
  Query: {
    getDrivers: async (obj, args, context, info) => {
      const normalizedArgs = await argsSchema.validate(args);
      const {
        limit,
        offset,
        filters
      } = normalizedArgs;

      const {
        name,
        team,
        year
      } = filters;

      let query = {};
      if (name) {
        const searchName = new RegExp(name, 'i');
        if(!('$and' in query))
          query = {$and: []}
        
        query.$and.push({
          $or: [
            { "lastName": searchName },
            { "firstName": searchName }]
        })
      }

      if (team) {
        const searchTeam = new RegExp(team, 'i');
        if(!('$and' in query))
          query = {$and: []}
        
        query.$and.push(
          { "teams": searchTeam }
        )
      }
      const drivers = await Driver
        .find(query)
        .sort({ dateOfBirth: -1 })
        .limit(limit)
        .skip(offset)
        .exec()

      const driverCount = await Driver
        .find(query)
        .countDocuments();

      return { drivers, driverCount }
    },
    getDriver: async (obj, args, context, info) => {
      return await Driver.findById(args.driverID).populate({
        path: "races.race",
        model: "Race",
      })
    },
    getDriverCount: async (obj, args, context, info) => {
      return await Driver.find({}).countDocuments();
    },
    getDriverFilters: () => {
      return { teams: [] }
    }
  },
};

export default {
  typeDefs,
  resolvers,
};
