import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RACE } from '../../queries';
import { CircularProgress, Container, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ResultTable from './ResultTable';
import RaceInfoTable from './RaceInfoTable';

const RaceInfo = () => {
  const { gp } = useParams();
  const { data, loading } = useQuery(GET_RACE, {
    variables: {
      raceInfoGrandPrix: decodeURIComponent(gp)
    }
  });

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  const raceInfo = data?.raceInfo;
  if (!raceInfo) {
    return (
      <Typography>No race found with that gp</Typography>
    );
  }
  return (
    <Container maxWidth="lg" >
      <Box display="flex" flexDirection="column">
        <Paper elevation={2} sx={{margin:2}}>
          <Box textAlign="center">
            <Typography variant="h2">{raceInfo.grandPrix}</Typography>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
            <Box sx={{ alignSelf: 'center', padding:1 }}>
              <img style={{ maxHeight: 400, maxWidth: 400 }} src={raceInfo.pictureLink} />
            </Box>
            <RaceInfoTable race={raceInfo} />
          </Box>
        </Paper>
        <Box>
          <ResultTable results={raceInfo.results} />
        </Box>
      </Box>
    </Container>
  );
};

export default RaceInfo;