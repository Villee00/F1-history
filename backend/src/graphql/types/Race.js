import { gql } from "apollo-server";

const typeDefs = gql`
  type Race {
    id: ID!
    date: String!
    circuit: Circuit
    grandPrix: String!
    pictureLink: String
    weather: String!
    laps: Int!
  }
`;

const resolvers = {
  Race: {
    circuit: async (race, args, context, info) => {
      return (await race.populate("circuit").execPopulate()).circuit;
    },
  },
};

export default { typeDefs, resolvers };
