import { gql } from "apollo-server";
import createRace from "./mutations/createRace.js";
import races from "./queries/races.js";
import Circuit from "./types/Circuit.js";
import Race from "./types/Race.js";
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
  createRace.typeDefs,
  Circuit.typeDefs,
];

const resolvers = [
  Race.resolvers,
  races.resolvers,
  createRace.resolvers,
  Circuit.resolvers,
];

const schema = {
  typeDefs,
  resolvers,
};

export default schema;
