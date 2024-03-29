import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Collapse, Icon, IconButton, Stack, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CakeIcon from '@mui/icons-material/Cake';
import FlagIcon from '@mui/icons-material/Flag';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const DriverTable = ({ driver }) => {
  const birthday = new Date(driver.dateOfBirth).toLocaleDateString('en-FI');

  return (
    <TableContainer sx={{ maxWidth: 500 }} component={Paper}>
      <Table sx={{ minWidth: 400 }} aria-label="Driver info" cy-data="driver-info-container">
        <TableBody>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Date of birth
            </TableCell>
            <TableCell align="right" cy-data="driver-info-birthday">{birthday}</TableCell>
            <TableCell align="right">
              <Icon size="small">
                <CakeIcon />
              </Icon>
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Nationality
            </TableCell>
            <TableCell align="right" cy-data="driver-info-nationality">{driver.nationality}</TableCell>
            <TableCell align="right">
              <Icon size="small">
                <FlagIcon />
              </Icon>
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Races driven
            </TableCell>
            <TableCell align="right" cy-data="driver-info-races-amount">{driver.races.length}</TableCell>
            <TableCell align="right">
              <Icon size="small">
                <DriveEtaIcon />
              </Icon>
            </TableCell>
          </TableRow>
          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              Positions gained on race
            </TableCell>
            <TableCell align="right" cy-data="driver-info-positions-gained">{driver.positionsGainedCareer}</TableCell>
            <TableCell align="right">
              <Icon size="small">
                {driver.positionsGainedCareer < 0 ? (
                  <TrendingDownIcon />
                ) : (
                  <TrendingUpIcon />
                )}
              </Icon>
            </TableCell>
          </TableRow>

          <CollapseRow header="Seasons driven" data={driver.seasonsDriven} />
          <CollapseRow
            header="Teams raced in"
            data={driver.teams.map((team) => team.name)}
          />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const CollapseRow = ({ header, data }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{ '& > *': { borderBottom: 'unset' } }}
        onClick={() => setOpen(!open)}
      >
        <TableCell component="th" scope="row">
          {header}
        </TableCell>
        <TableCell align="right">{data.length}</TableCell>
        <TableCell align="right">
          <IconButton aria-label="expand row" size="small" align="right">
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Stack spaceing={2} textAlign="center">
              {data.map((object) => (
                <Typography key={object} margin={2}>
                  {object}
                </Typography>
              ))}
            </Stack>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default DriverTable;
