import { gql, UserInputError } from 'apollo-server';
import User from '../../models/user.js';
import bcrypt from 'bcrypt';
import * as yup from 'yup';

const typeDefs = gql`
  input UserInput {
    name: String
    username: String
    password: String
  }

  extend type Mutation {
    createUser(input: UserInput): User
  }
`;

const argsSchema = yup.object({
  name: yup.string().required(),
  username: yup.string().required().lowercase().trim(),
  password: yup.string().required().trim(),
});

const resolvers = {
  Mutation: {
    createUser: async (root, args) => {
      const { name, username, password } = await argsSchema.validate(
        args.input
      );

      const foundUser = await User.findOne({ username: username });
      if (foundUser) {
        throw new UserInputError(
          'That username already exists, please choose another one.'
        );
      }

      const passwordHash = await bcrypt.hash(password, 10);
      const user = new User({ name, username, passwordHash });
      return user.save();
    },
  },
};

export default { typeDefs, resolvers };
