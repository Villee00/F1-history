import { gql } from "apollo-server";
import races from "./queries/races.js";
import Circuit from "./types/Circuit.js";
import Race from "./types/Race.js";
import Season from "./types/Season.js";
import driver from "./queries/driver.js";
import user from "./queries/user.js";
import Driver from "./types/Driver.js";
import DriverFilter from "./types/Filter.js";
import Team from "./types/Team.js";
import User from "./types/User.js";
import createUser from "./mutations/createUser.js";
import login from "./mutations/login.js";
import addFavorite from "./mutations/addFavorite.js";
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
  Team.typeDefs,
  User.typeDefs,
  createUser.typeDefs,
  login.typeDefs,
  user.typeDefs,
  addFavorite.typeDefs
];

const resolvers = [
  Race.resolvers,
  races.resolvers,
  Circuit.resolvers,
  Season.resolvers,
  Driver.resolvers,
  driver.resolvers,
  DriverFilter.resolvers,
  Team.resolvers,
  User.resolvers,
  createUser.resolvers,
  login.resolvers,
  user.resolvers,
  addFavorite.resolvers
];

const schema = {
  typeDefs,
  resolvers,
};

export default schema;
