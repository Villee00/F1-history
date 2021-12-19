import { gql } from "apollo-server";
import races from "./queries/races.js";
import Circuit from "./types/Circuit.js";
import Race from "./types/Race.js";
import Season from "./types/Season.js";
import driver from "./queries/driver.js";
import Driver from "./types/Driver.js";
import DriverFilter from "./types/Filter.js";
import Team from "./types/Team.js";

const rootTypeDefs = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`;

const typeDefs = [
  rootTypeDefs,
  Race.typeDefs,
  races.typeDefs,
  Circuit.typeDefs,
  Season.typeDefs,
  Driver.typeDefs,
  driver.typeDefs,
  DriverFilter.typeDefs,
  Team.typeDefs
];

const resolvers = [
  Race.resolvers,
  races.resolvers,
  Circuit.resolvers,
  Season.resolvers,
  Driver.resolvers,
  driver.resolvers,
  DriverFilter.resolvers,
  Team.resolvers
];

const schema = {
  typeDefs,
  resolvers,
};

export default schema;
