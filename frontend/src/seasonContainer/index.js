import React, { useEffect } from 'react';
import { Autocomplete, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import RacesContainer from '../racesContainer';
import { Box } from '@mui/system';
import { useHistory, useParams } from 'react-router-dom';

const SeasonsContainer = () => {
  const { year } = useParams();
  const [selectedYear, setSelectedYear] = React.useState("1990");
  const history = useHistory();
  const years = [];

  const handleChange = (event, year) => {
    setSelectedYear(year);
    history.push('/seasons/' + year);

  };

  useEffect(() => {
    if (year < 1950) {
      setSelectedYear(1950);
    }
    else if (year > 2020) {
      setSelectedYear(2020);
    }
    else if (year != null) {
      setSelectedYear(year);
    }
    return () => { };
  }, [year]);
  for (let year = 1950; year <= 2020; year++) {
    years.push(year.toString());
  }
  return (
    <Paper elevation={2} sx={{ alignItems: 'center', padding: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs sx={{ textAlign: 'center' }}>
          <Paper sx={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h3">Select a season: </Typography>
            <Autocomplete
              value={selectedYear}
              options={years}
              disableClearable
              getOptionLabel={(option) => option.toString()}
              renderInput={(params) =>
                <TextField sx={{ minWidth: 300, justifyContent: 'center' }}
                  {...params} label="Year" />}
              onChange={handleChange} />
          </Paper>

          <Box sx={{ position: 'relative', overflow: 'auto', height: '74vh' }}>
            <RacesContainer year={selectedYear} />
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SeasonsContainer;