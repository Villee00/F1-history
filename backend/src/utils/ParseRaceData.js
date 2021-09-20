import Circuit from "../models/circuit.js";

const ParseRaceData = async (raceData, tooltip, pictures, race) => {
  let raceDate;

  if (!raceData.date) {
    console.log(`No race date: ${tooltip}`);
  } else {
    raceDate = new Date(raceData.date);

    if (raceData.year) raceDate.setFullYear(raceData.year);
  }

  const imageName = raceData.image.replace(/ /g, "_");

  const image = pictures.find((n) =>
    n.includes(
      encodeURIComponent(imageName.replace("File:", ""))
        .replace(/\(/g, "%28")
        .replace(/\)/g, "%29")
    )
  );

  return {
    date: raceDate,
    grandPrix: tooltip,
    pictureLink:
      image || "https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg",
    weather: raceData.weather ? raceData.weather : "unknown",
    laps: raceData.distanceLaps ? raceData.distanceLaps : 0,
  };
};

export const parseCircuitToDB = async (circuit) => {
  if (Array.isArray(circuit.location)) {
    circuit.location = circuit.location.join(", ");
  }

  if (!circuit.capacity) {
    console.log(`${circuit.name} - no capacity`);
  }
  if (!circuit.length) {
    console.log(`${circuit.name} - no length`);
  }
  const circuitObject = new Circuit(circuit);

  return circuitObject.save();
};

export default ParseRaceData;
