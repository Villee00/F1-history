import { gql } from "apollo-server";
import Driver from "../../models/driver.js";
import Team from "../../models/team.js";
import * as yup from "yup";
import mongoose from "mongoose";

export const typeDefs = gql`
  type Drivers {
    drivers: [Driver!]!
    driverCount: Int!
  }
  input Filters {
    name: String
    teams: [ID]
    year: Int
    nationality: String
  }
  input Sorting {
    field: String
    order: String
  }
  extend type Query {
    getDrivers(
      limit: Int
      offset: Int
      filters: Filters
      sort: Sorting
    ): Drivers!
    getDriver(driverID: String!): Driver!
    getDriverCount: Int!
    getDriverFilters: [Team!]!
  }
`;

const argsSchema = yup.object({
  limit: yup.number().default(10),
  offset: yup.number(),
  filters: yup.object().shape({
    name: yup.string(),
    teams: yup.array().of(yup.string()),
    year: yup
      .number()
      .min(1950, "Season must be between 1950 and 2021")
      .max(2021, "Season must be between 1950 and 2021"),
    nationality: yup.string(),
  }),
  sort: yup.object().shape({
    field: yup.string(),
    order: yup.string(),
  }),
});

let query = {};
const buildDBquery = (mongoQuery, filter) => {
  if (filter) {
    if (!("$and" in query)) query = { $and: [] };
    query.$and.push(mongoQuery);
  }
};

const sortOrderQuery = (field, order) => {
  switch (field) {
    case "age":
      return { dateOfBirth: order };
    case "races":
      return { __v: order };
  }
};

export const resolvers = {
  Query: {
    getDrivers: async (obj, args, context, info) => {
      const normalizedArgs = await argsSchema.validate(args);
      const { limit, offset, filters, sort } = normalizedArgs;

      const { name, teams, year, nationality } = filters;

      query = {};

      buildDBquery(
        {
          $or: [
            { lastName: new RegExp(name, "i") },
            { firstName: new RegExp(name, "i") },
          ],
        },
        name
      );
      buildDBquery(
        { teams: { $in: teams.map((team) => mongoose.Types.ObjectId(team)) } },
        teams.length > 0 ? teams : false
      );
      buildDBquery({ nationality: new RegExp(nationality, "i") }, nationality);
      buildDBquery({ seasonsDriven: parseInt(year) }, year);

      const sortOrder = sortOrderQuery(sort.field, sort.order);
      const drivers = await Driver.find(query)
        .sort(sortOrder)
        .limit(limit)
        .skip(offset)
        .populate({
          path: "teams",
          model: "Team",
        })
        .exec();

      const driverCount = await Driver.find(query).countDocuments();

      return { drivers, driverCount };
    },
    getDriver: async (obj, args, context, info) => {
      return await Driver.findById(args.driverID)
        .populate({
          path: "races.race",
          model: "Race",
        })
        .populate({
          path: "teams",
          model: "Team",
        });
    },
    getDriverCount: async (obj, args, context, info) => {
      return await Driver.find({}).countDocuments();
    },
    getDriverFilters: async () => {
      return await Team.find({});
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
