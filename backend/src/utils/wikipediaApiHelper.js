import wiki from "wikijs";
import Circuit from "../models/circuit.js";
import Race from "../models/race.js";
import Season from "../models/season";
import ParseRaceData from "./ParseRaceData.js";

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
    let location = await page.info("location");

    if (Array.isArray(location)) {
      location = location.join(", ");
    }

    if (!capacity) {
      console.log(`${name} - no capacity`);
    }
    if (!length) {
      console.log(`${name} - no length`);
    }
    const circuit = new Circuit({
      name,
      length: length ? Number.parseFloat(length) : 0,
      capacity: capacity ? Number.parseFloat(capacity) : 0,
      location: location,
    });

    return circuit.save();
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
    year: seasonInfo.year,
  });
  for (let i = 0; i < racesSeason.length; i++) {
    try {
      const race = racesSeason[i];

      const tooltip = race.tooltip ? race.tooltip : race.report;
      console.log(tooltip);

      const isRaceAdded = await Race.findOne({ grandPrix: tooltip });

      if (!isRaceAdded) {
        const report = await wiki({
          headers,
        }).page(tooltip);
        const raceData = await report.info();
        const pictures = await report.images();

        const raceObj = await addRace(
          await ParseRaceData(raceData, tooltip, pictures, race),
          raceData.location[0]
        );

        seasonObj.races.push(raceObj);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return await seasonObj.save();
};

export const addRace = async (race, circuitName) => {
  let circuit = await Circuit.findOne({ name: circuitName });

  if (!circuit) {
    circuit = await addCircuit(circuitName);
  }

  const newRace = new Race({ ...race, circuit: circuit });
  return await newRace.save();
};
