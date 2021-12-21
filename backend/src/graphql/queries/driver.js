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
    nationality: String
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
    year: yup.number(),
    nationality: yup.string()
  })
})

let query = {};
const buildDBquery = (mongoQuery, filter) => {
  if (filter) {
    if (!('$and' in query))
      query = { $and: [] }
    query.$and.push(mongoQuery)
  }
}

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
        year,
        nationality
      } = filters;

      query = {};

      buildDBquery({ $or: [{ "lastName": new RegExp(name, 'i') }, { "firstName": new RegExp(name, 'i') }] }, name);
      buildDBquery({ "teams": new RegExp(team, 'i') }, team);
      buildDBquery({ "nationality": new RegExp(nationality, 'i') }, nationality);
      buildDBquery({ "seasonsDriven": parseInt(year) }, year);

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
