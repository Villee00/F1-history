import fetch from "cross-fetch";
const getRaceWinners = async (year, round) => {
  const fetched = await fetch(
    `http://ergast.com/api/f1/${year}/${round}/results.json`
  );

  const json = await fetched.text();
  const data = JSON.parse(json);
  const result = data.MRData.RaceTable.Races;

  console.log(result[0].Results);
  return result[0].Results;
};
