import { gql, UserInputError } from "apollo-server";
import * as yup from "yup";
import dotenv from "dotenv";
import Driver from "../../models/driver";
import Race from "../../models/race";
dotenv.config();

const typeDefs = gql`
  extend type Mutation {
    addFavorite(driverID: String, raceID: String): User
  }
`;

const argsSchema = yup.object({
  driverID: yup.string().nullable(true),
  raceID: yup.string().nullable(true),
});
const resolvers = {
  Mutation: {
    addFavorite: async (root, args, context) => {
      const { driverID, raceID } = await argsSchema.validate(args);
      const { currentUser } = context;
      if (!currentUser) {
        throw new UserInputError("Token validation failed");
      }
      if (driverID) {
        const driver = await Driver.findById(driverID);
        if (!driver) throw new UserInputError("No driver found with that id");
        if (currentUser.favorites.drivers.some((d) => d.id === driver.id))
          currentUser.favorites.drivers = currentUser.favorites.drivers.filter(
            (favoriteDriver) => favoriteDriver.id !== driver.id
          );
        else
          currentUser.favorites.drivers =
            currentUser.favorites.drivers.concat(driver);

        return await currentUser.save();
      }
      if (raceID) {
        const race = await Race.findById(raceID);
        if (!race) throw new UserInputError("No race found with that id");

        if (currentUser.favorites.races.some((r) => r.id === race.id))
          currentUser.favorites.races = currentUser.favorites.races.filter(
            (favoriteRace) => favoriteRace.id !== race.id
          );
        else
          currentUser.favorites.races =
            currentUser.favorites.races.concat(race);
        return await currentUser.save();
      }
      return currentUser;
    },
  },
};

export default { typeDefs, resolvers };
