import React from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_DRIVER } from '../../queries';
import { CircularProgress, Container, Link, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import DriverTable from './DriverTable';
import DriverRacesTable from './DriverRacesTable';
import FavoriteButton from '../../components/FavoriteButton';
import { buildPictureURL } from '../../utils/PictureChanger';
import ReactHtmlParser from 'react-html-parser';


const DriverInfo = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(GET_DRIVER, {
    variables: {
      getDriverDriverId: id
    }
  });

  if (loading) {
    return (
      <CircularProgress />
    );
  }

  const driverInfo = data?.getDriver;
  if (!driverInfo) {
    return (
      <Typography>No driver found with that id</Typography>
    );
  }

  let picture = driverInfo.picture.link;
  if (picture !== 'https://cdn.pixabay.com/photo/2014/04/03/10/07/checkered-flag-309862_960_720.png')
    picture = buildPictureURL(picture, 500);

  return (
    <Container maxWidth="lg" >
      <Box display="flex" flexDirection="column">
        <Paper elevation={3} sx={{ marginBottom: 2 }}>
          <Box textAlign="center">
            <Typography variant="h2">{driverInfo.fullName}</Typography>
            <Link underline="hover" href={driverInfo.wikipediaLink}>
              <Typography variant="button">Wikipedia</Typography>
            </Link>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="space-evenly" flexWrap="wrap" sx={{ placeItems: 'flex-start' }} margin={2}>
            <Paper elevation={3} sx={{ padding: 1, display: 'flex', flexDirection: 'column', maxWidth: 350 }}>

              <Link href={driverInfo.picture.description}>
                <img style={{ maxHeight: 400, maxWidth: 350 }} src={picture ? picture : driverInfo.picture.link} />
              </Link>
              {driverInfo.picture.author ?
                <>
                  <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption">Picture Author: {ReactHtmlParser(driverInfo.picture.author)} </Typography>
                  <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption" >Source: {ReactHtmlParser(driverInfo.picture.source)}</Typography>
                  <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption">via: <Link href={ReactHtmlParser(driverInfo.picture.description)}>Wikimedia Commons</Link></Typography>
                  <Typography sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} variant="caption">License: <Link href={driverInfo.picture.licenseInfo}>{ReactHtmlParser(driverInfo.picture.license)}</Link></Typography>
                </> : null
              }

            </Paper>
            <DriverTable driver={driverInfo} />
            <FavoriteButton driverId={driverInfo.id} />
          </Box>
        </Paper>
        <Box>
          <DriverRacesTable races={driverInfo.races} />
        </Box>
      </Box>
    </Container>
  );
};

export default DriverInfo;