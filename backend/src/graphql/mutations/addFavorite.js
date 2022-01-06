import { gql, UserInputError } from "apollo-server";
import User from "../../models/user.js";
import bcrypt from 'bcrypt';
import * as yup from 'yup';
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import Driver from '../../models/driver'
import Race from '../../models/race'
dotenv.config();

const typeDefs = gql`
extend type Mutation {
  addFavorite(driverID: String, raceID: String): User
} `

const argsSchema = yup.object({
  driverID: yup.string(),
  raceID: yup.string()
})
const resolvers = {
  Mutation: {
    addFavorite: async (root, args, context) => {
      const { driverID, raceID } = await argsSchema.validate(args);
      const { currentUser } = context;
      if (!currentUser) {
        throw new UserInputError("Token validation failed");
      }
      if (driverID) {
        const driver = await Driver.findById(driverID).exec();
        if (!driver)
          throw new UserInputError("No driver found with that id");
        if (currentUser.favorites.drivers.some(d => d.id === driver.id))
          currentUser.favorites.drivers = currentUser.favorites.drivers.map(favoriteDriver => favoriteDriver.id === driver.id ? null : favoriteDriver);
        else
          currentUser.favorites.drivers = currentUser.favorites.drivers.concat(driver);

        return await currentUser.save();
      }
      else if (raceID) {
        const race = await Race.findById(raceID)
        if (!race)
          throw new UserInputError("No race found with that id");

        if (currentUser.favorites.races.some(r => r.id === race.id))
          currentUser.favorites.races = currentUser.favorites.races.map(favoriteRace => favoriteRace.id === race.id ? null : favoriteRace);
        else
          currentUser.favorites.races = currentUser.favorites.races.concat(race);
        return await currentUser.save();
      }
      else {
        throw new UserInputError("Failed to add to favorites");
      }
    }
  }
}

export default { typeDefs, resolvers };