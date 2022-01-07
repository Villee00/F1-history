import wiki from "wikijs";
import Circuit from "../models/circuit.js";
import Race from "../models/race.js";
import Season from "../models/season";
import { getRaceResults, getSeasonFromErgast } from "./ergestApiHelper.js";
import ParseRaceData, { parseCircuitToDB } from "./ParseRaceData.js";

const headers = {
  "User-Agent":
    "F1history/0.0 (https://example.org/; cool-tool@example.org) wikijs/6.3",
};

export const addCircuit = async (name) => {
  try {
    const page = await wiki({
      headers,
    }).find(name);

    const length = await page.info("lengthKm");
    const capacity = await page.info("capacity");
    const location = await page.info("location");

    return await parseCircuitToDB({
      name,
      length: length ? Number.parseFloat(length) : undefined,
      capacity: capacity ? Number.parseFloat(capacity) : undefined,
      location: location || "unkown",
    });
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
};

export const addSeason = async (year) => {
  const seasonPage = await wiki({
    headers,
  }).find(`${year} Formula One Season`);
  const seasonInfo = await seasonPage.info();
  const tables = await seasonPage.tables();

  const racesSeason = tables.filter(
    (table) =>
      (table[0].round && (table[0].tooltip || table[0].report)) ||
      (table[0].rnd && (table[0].tooltip || table[0].report))
  )[0];

  const seasonObj = new Season({
    wikipediaLink: seasonPage.fullurl,
    year,
  });

  //Check if races on the season was found 
  if (racesSeason) {
    for (let i = 0; i < racesSeason.length; i++) {
      try {
        const race = racesSeason[i];
        const round = race.round
          ? parseInt(race.round.replace(/[^0-9.]/g, ""))
          : parseInt(race.rnd.replace(/[^0-9.]/g, ""));

        const tooltip = race.tooltip ? race.tooltip : race.report;
        console.log(tooltip);
        const raceDB = await addRace(tooltip, seasonObj.year);
        seasonObj.races.push(raceDB);
        await getRaceResults(raceDB, seasonInfo.year, round);
        await raceDB.save();

      } catch (error) {
        console.log(error);
      }
    }
  }
  else {
    const races = await getSeasonFromErgast(year);
    for (let index = 0; index < races.length; index++) {
      try {
        const race = races[index];
        console.log(`${race.raceName} ${race.season}`)
        const raceDB = await addRace(`${race.season} ${race.raceName}`, year);
        seasonObj.races.push(raceDB);
        await getRaceResults(raceDB, seasonInfo.year, parseInt(race.round));
        await raceDB.save();
        
      } catch (error) {
        console.log(error);
      }
    }
  }
  return await seasonObj.save();
};

export const createRace = async (race, circuitName) => {
  let circuit = await Circuit.findOne({ name: circuitName });

  if (!circuit) {
    circuit = await addCircuit(circuitName);
  }

  const newRace = new Race({ ...race, circuit: circuit });
  return newRace;
};

export const getPictureLink = async (title) => {
  let picture = "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg";
  try {
    console.log(title)
    const page = await wiki({
      headers,
    }).api({
      action: 'query',
      titles: decodeURI(title),
      prop:"pageimages",
      piprop:"original"
    });
    for (const [key, value] of Object.entries(page.query.pages)) {
      picture = value.original.source;
      break;
    }
    return picture;
  } catch (error) {
    console.log("Could not get picture " + error.message);
    return picture;
  }
};

const addRace = async (raceTitle, year) => {
  let race = await Race.findOne({ grandPrix: raceTitle });
  if (!race) {
    const report = await wiki({
      headers,
    }).page(raceTitle);
    const raceData = await report.info();
    const picture = await report.mainImage();
    
    console.log(typeof raceData.location != 'undefined'? raceData.location[0]: raceData.circuit)
    race = await createRace(
      await ParseRaceData(
        raceData,
        raceTitle,
        picture,
        year
      ),
      typeof raceData.location != 'undefined'? raceData.location[0]: raceData.circuit
    );
  }

  return race;
}