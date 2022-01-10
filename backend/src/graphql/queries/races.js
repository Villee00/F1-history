import { gql } from "apollo-server";
import Race from "../../models/race.js";
import Season from "../../models/season.js";
import { addSeason } from "../../utils/wikipediaApiHelper.js";

export const typeDefs = gql`
  extend type Query {
    allRaces(seasonYear: Int!): Season
    raceInfo(grandPrix: String!): Race
    filterRaces(weather: String): [Race]!
    loadData: String
    getPictureData: String
  }
`;

export const resolvers = {
  Query: {
    allRaces: async (root, args) => {
      let season = await Season.findOne({
        year: args.seasonYear,
      }).populate("races");

      if (!season) {
        season = await addSeason(args.seasonYear);
      }
      season.races.forEach((race) => {
        race.populate("circuit");
      });

      return season;
    },
    raceInfo: async (root, args) => {
      const race = await Race.findOne({
        grandPrix: args.grandPrix,
      })
        .populate({
          path: "circuit",
          model: "Circuit",
        })
        .populate({
          path: "results.driver",
          model: "Driver",
        });
      return race;
    },
    filterRaces: async (root, args) => {
      const regexFilter = new RegExp(`${args.weather}*`, "i");
      const races = await Race.find({
        weather: { $regex: regexFilter },
      });
      return races;
    },
    loadData: async (root, args) => {
      for (let year = 1950; year < 2021; year++) {
        const season = await Season.findOne({
          year,
        });
        if (!season) await addSeason(year);
      }
      return "valmis!";
    },

    getPictureData: async (root, args) => {
      const races = await Race.find({});
      for (let index = 0; index < races.length; index++) {
        const race = races[index];
        const pictureSplitted = race.pictureLink.split("/");

        const link = `https://magnus-toolserver.toolforge.org/commonsapi.php?image=${
          pictureSplitted[pictureSplitted.length - 1]
        }&thumbwidth=150&thumbheight=150&versions&meta`;

        const XMLdata = await fetch(link);
        const data = await XMLdata.text();
        const parser = new XMLParser();
        const metaPicture = parser.parse(data);

        let licence = metaPicture.response.licenses.license;
        if (!licence) licence = metaPicture.file.licenses[0].license;
        race.picture.licenseInfo = licence.license_info_url
          ? licence.license_info_url
          : null;
        race.picture.license = licence.name;
        race.picture.author = metaPicture.response.file.author
          ? metaPicture.response.file.author
          : "Unknown";
        race.picture.source = metaPicture.response.file.source
          ? metaPicture.response.file.author
          : "Unknown";
        race.picture.description = metaPicture.response.file.urls.description;
        race.picture.link = race.pictureLink;
        console.log(race.grandPrix);
        await race.save();
      }
    },
  },
};

export default {
  typeDefs,
  resolvers,
};
