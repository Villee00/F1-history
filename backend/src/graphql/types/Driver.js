import { gql } from "apollo-server";

const typeDefs = gql`
  type Races {
    race: Race
    position: Int
    grid: Int
  }
  type Driver {
    id: ID!
    driverNumber: Number
    firstName: String!
    lastName: String!
    nationality: String
    dateOfBirth: Date
    races: [Races!]
    wikipediaLink: String!
  }
`;

const resolvers = {
  Races: {
    race: async (races, args, context, info) => {
      return (await races.populate("race").execPopulate()).race;
    },
  },
  Driver: {},
};

export default { typeDefs, resolvers };
