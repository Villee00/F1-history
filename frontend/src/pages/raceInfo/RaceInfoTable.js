import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
const RaceInfoTable = ({ race }) => {
  const raceDate = new Date(race.date);
  const day = raceDate.getUTCDate().toString().padStart(2, '0');
  const month = (raceDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = raceDate.getUTCFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return (
    <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="Race info">
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Date
            </TableCell>
            <TableCell align="right" cy-data="race-info-date">{formattedDate}</TableCell>
          </TableRow>
          {race.circuit?.location ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Location
              </TableCell>
              <TableCell align="right" cy-data="race-info-location">{race.circuit.location}</TableCell>
            </TableRow>
          ) : null}

          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Laps
            </TableCell>
            <TableCell align="right" cy-data="race-info-laps">{race.laps}</TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Weather
            </TableCell>
            <TableCell align="right" cy-data="race-info-weather">{race.weather}</TableCell>
          </TableRow>
          {race.circuit?.length ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Lap lenght
              </TableCell>
              <TableCell align="right" cy-data="race-info-lap-length">{race.circuit.length} km</TableCell>
            </TableRow>
          ) : null}

          {race.circuit?.capacity ? (
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                Capacity
              </TableCell>
              <TableCell align="right">{race.circuit.capacity}K</TableCell>
            </TableRow>
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RaceInfoTable;
