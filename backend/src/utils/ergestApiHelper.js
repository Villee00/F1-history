import fetch from "cross-fetch";
import Driver from "../models/driver.js";
import Team from "../models/team.js";
import { getPictureLink } from "./wikipediaApiHelper.js";

export const getRaceResults = async (race, year, round) => {
  const data = await fetchJSONFromErgast(`http://ergast.com/api/f1/${year}/${round}/results.json`);
  const result = data.MRData.RaceTable.Races;

  for (let index = 0; index < result[0].Results.length; index++) {
    const finisher = result[0].Results[index];

    const driverInfo = finisher.Driver;

    const firstName = driverInfo.givenName;
    const lastName = driverInfo.familyName;

    let driverInDB = await Driver.findOne({ firstName, lastName }).populate({
      path: "teams",
      model: "Team",
    });
    const team = await getTeam(finisher.Constructor.name);

    if (!driverInDB) {
      const nationality = driverInfo.nationality;
      const dateOfBirth = driverInfo.dateOfBirth;
      const wikipediaLink = driverInfo.url;
      const pictureLink = await getPictureLink(driverInfo.url.split('en.wikipedia.org/wiki/')[1]);

      driverInDB = new Driver({
        firstName,
        lastName,
        nationality,
        dateOfBirth,
        wikipediaLink,
        seasonsDriven: [year],
        driverNumber: [finisher.number],
        teams: [team],
        pictureLink,
      });
    } else if (!driverInDB.seasonsDriven.includes(year)) {
      driverInDB.seasonsDriven.push(year);
      if (!driverInDB.driverNumber.includes(finisher.number)) {
        driverInDB.driverNumber.push(finisher.number);
      }

      if (!driverInDB.teams.some(DBteam => DBteam.id === team.id)) {
        driverInDB.teams.push(team);
      }
    }

    driverInDB.races.push({
      race,
      position: finisher.position,
      grid: finisher.grid,
    });

    const driver = await driverInDB.save();
    race.results.push({
      driver,
      position: finisher.position,
      grid: finisher.grid,
    });
  }
};

const fetchJSONFromErgast = async (url) => {
  const fetched = await fetch(
    url
  );
  const json = await fetched.json();
  return json;
}
export const getTeam = async (team) => {
  const foundTeam = await Team.findOne({ name: team });
  if (!foundTeam) {
    const newTeam = new Team({ name: team });
    return await newTeam.save();
  }
  return foundTeam;
}

export const getSeasonFromErgast = async (year) => {
  const data = await fetchJSONFromErgast(`http://ergast.com/api/f1/${year}.json`);
  return data.MRData.RaceTable.Races;
}

