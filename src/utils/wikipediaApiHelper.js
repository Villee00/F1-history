import wiki from "wikijs";
import Circuit from "../models/circuit.js";
import Race from "../models/race.js";

const headers = {
  "User-Agent":
    "F1history/0.0 (https://example.org/; cool-tool@example.org) wikijs/6.3",
};

export const addCircuit = async (name) => {
  const circuitName = name.replace(/ /g, "_");
  try {
    const page = await wiki({
      headers,
    }).page(circuitName);

    const length = await page.info("lengthKm");
    const capacity = await page.info("capacity");
    const location = await page.info("location");

    const circuit = new Circuit({
      name,
      length: length ? Number.parseFloat(length) : 0,
      capacity: capacity ? Number.parseFloat(capacity) : 0,
      location: location.join(", "),
    });

    return circuit.save();
  } catch (error) {
    console.log(`No wikipedia article found with ${circuitName}`);
  }
};

export const addSeason = async () => {
  const page = await wiki({
    headers,
  }).page("2019_Formula_One_World_Championship");
  const tables = await page.tables();

  const racesSeason = tables.filter(
    (table) => table[0].round && table[0].tooltip
  )[0];

  for (let i = 0; i < racesSeason.length; i++) {
    try {
      const race = racesSeason[i];
      console.log(race.tooltip);

      const isRaceAdded = await Race.findOne({ grandPrix: race.tooltip });

      if (!isRaceAdded) {
        const report = await wiki({
          headers,
        }).page(race.tooltip);

        const raceData = await report.info();
        await addRace(
          {
            date: raceData.year
              ? new Date(raceData.year)
              : new Date(raceData.date),
            grandPrix: race.tooltip,
            pictureLink: raceData.image,
          },
          raceData.location[0]
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
};

export const addRace = async (race, circuitName) => {
  let circuit = await Circuit.findOne({ name: circuitName });

  if (!circuit) {
    circuit = await addCircuit(circuitName);
  }

  const newRace = new Race({ ...race, circuit: circuit });
  return await newRace.save();
};
