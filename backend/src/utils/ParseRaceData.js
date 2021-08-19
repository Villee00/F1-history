const ParseRaceData = async (raceData, pictures, race) => {
  let raceDate;

  if (!raceData.date) {
    console.log(`No race date: ${race.tooltip}`);
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
    grandPrix: race.tooltip,
    pictureLink: image,
    weather: raceData.weather ? raceData.weather : "unknown",
    laps: raceData.distanceLaps ? raceData.distanceLaps : 0,
  };
};

export default ParseRaceData;
