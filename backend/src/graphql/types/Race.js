import { gql } from "apollo-server";

const typeDefs = gql`
  type Results {
    id: Int
    driver: Driver
    position: Int
    grid: Int
    positionsGained: Int
  }
  type Race {
    id: ID!
    date: String!
    circuit: Circuit
    grandPrix: String!
    pictureLink: String
    weather: String!
    laps: Int!
    results: [Results!]
  }
`;

const resolvers = {
  Results: {
    async positionsGained(obj, args, context, info) {
      return obj.grid - obj.position;
    },
  },
};

export default { typeDefs, resolvers };
