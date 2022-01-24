import { gql } from 'apollo-server';

const typeDefs = gql`
  type DriverFilter {
    teams: [Team!]
  }
`;

const resolvers = {
  DriverFilter: {},
};

export default { typeDefs, resolvers };
