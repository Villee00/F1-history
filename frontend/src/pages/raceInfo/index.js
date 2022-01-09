import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_RACE } from '../../queries';
import { CircularProgress, Container, Link, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ResultTable from './ResultTable';
import RaceInfoTable from './RaceInfoTable';
import FavoriteButton from '../../components/FavoriteButton';
import { buildPictureURL } from '../../utils/PictureChanger';
import ReactHtmlParser from 'react-html-parser';

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
  const picture = buildPictureURL(raceInfo.picture.link, 400);

  return (
    <Container maxWidth="lg" >
      <Box display="flex" flexDirection="column">
        <Paper elevation={2} sx={{ margin: 2 }}>
          <Box textAlign="center">
            <Typography variant="h2">{raceInfo.grandPrix}</Typography>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center" flexWrap="wrap">
            <Paper elevation={3} sx={{ alignSelf: 'center', p: 1, m:1, display:'flex', flexDirection:'column' }}>
              <Link href={raceInfo.picture.description}>
                <img style={{ maxHeight: 400, maxWidth: 400 }} src={picture} />
              </Link>
              <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption">Picture Author: {ReactHtmlParser(raceInfo.picture.author)} </Typography>
              <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption" >Source: {ReactHtmlParser(raceInfo.picture.source)}</Typography>
              <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption"> <Link href={ReactHtmlParser(raceInfo.picture.description)}>Wikimedia</Link></Typography>
              <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption">License: <Link href={ReactHtmlParser(raceInfo.picture.description)+'#Licensing'}>{ReactHtmlParser(raceInfo.picture.license)}</Link></Typography>

            </Paper>
            <RaceInfoTable race={raceInfo} />
            <FavoriteButton raceId={raceInfo.id} />
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