import { gql } from "apollo-server";
import Driver from "../../models/driver.js";

const typeDefs = gql`
    type DriverFilter {
        teams: [String!]
        nationality: [String!]
        seasons: [Int]
    }
`;

const resolvers = {
    DriverFilter: {
    async teams(args, context, info) {
        let teamSet = set();
        const teams = await Driver.find({}).select('teams -_id');
        return teams;
    },
  },
};

export default { typeDefs, resolvers };
