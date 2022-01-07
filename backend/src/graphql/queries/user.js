import { gql, UserInputError } from "apollo-server";
import User from '../../models/user';
import * as yup from 'yup';
import { getPictureLink } from "../../utils/wikipediaApiHelper";

export const typeDefs = gql`
  extend type Query {
    getUser(username: String!): User!
    me: User
    test: String
  }
`;

const argsSchema = yup.object({
  username: yup.string().required().lowercase().trim()
})
export const resolvers = {
  Query: {
    getUser: async (obj, args, context, info) =>{
      const {username} = await argsSchema.validate(args);
      console.log(context.currentUser);
      const user = await User.findOne({username})
      .populate({
        path: "favorites.races",
        model: "Race",
      })
      .populate({
        path: "favorites.drivers",
        model: "Driver",
      })
      if(!user){
        throw new UserInputError("No user found");
      }
      return user;
    },
    me: (root, args, context) => {
      return context.currentUser
    },
    test: async (root, args, context) =>{
      const link = "https://en.wikipedia.org/wiki/Sergio_P%C3%A9rez"
      return await getPictureLink(link.split('en.wikipedia.org/wiki/')[1])
    }
  },
};

export default {
  typeDefs,
  resolvers,
};
