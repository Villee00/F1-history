import { gql, UserInputError } from "apollo-server";
import User from "../../models/user.js";
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const typeDefs = gql`
input LoginInput{
  username: String!
  password: String!
}
type Token {
  value: String!
}
extend type Mutation {
  login(input: LoginInput): Token
} `

const argsSchema = yup.object({
  username: yup.string().required().lowercase().trim(),
  password: yup.string().required().trim()
})
const resolvers = {
  Mutation: {
    login: async (root, args) => {
      const { username, password } = await argsSchema.validate(args.input);

      const user = await User.findOne({ username: username });
      if (!user) {
        throw new UserInputError('Invalid username or password');
      }
      const validPassword = await bcrypt.compare(password, user.passwordHash);

      if (!validPassword) {
        throw new UserInputError('Invalid username or password');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    }
  }
}

export default { typeDefs, resolvers };