import { gql, UserInputError } from "apollo-server";
import User from "../../models/user";
import * as yup from "yup";

export const typeDefs = gql`
  extend type Query {
    getUser(username: String!): User!
    me: User
  }
`;

const argsSchema = yup.object({
  username: yup.string().required().lowercase().trim(),
});
export const resolvers = {
  Query: {
    getUser: async (obj, args, context, info) => {
      const { username } = await argsSchema.validate(args);
      console.log(context.currentUser);
      const user = await User.findOne({ username })
        .populate({
          path: "favorites.races",
          model: "Race",
        })
        .populate({
          path: "favorites.drivers",
          model: "Driver",
        });
      if (!user) {
        throw new UserInputError("No user found");
      }
      return user;
    },
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
