import { useQuery } from '@apollo/client';
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Paper,
  Typography,
} from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';
import { GET_USER } from '../../queries';
import RaceCard from '../racesContainer/RaceCard';
import DriverCard from '../driversContainer/DriverCard';

const UserPage = () => {
  const { username } = useParams();
  const { data, loading, error } = useQuery(GET_USER, {
    fetchPolicy: 'no-cache',
    variables: {
      username,
    },
  });
  if (loading) {
    return <CircularProgress />;
  }
  if (error) {
    console.log(error);
    return (
      <Box>
        <Typography variant="h2">There is no users named {username}</Typography>
      </Box>
    );
  }

  const { name, favorites } = data.getUser;
  return (
    <Container fixed maxWidth="lg" sx={{ textAlign: 'center' }}>
      <Paper sx={{ pb: 1 }}>
        <Box
          flexDirection="row"
          display="flex"
          padding={2}
          justifyContent="center"
        >
          <Box>
            <Avatar sx={{ width: 70, height: 70 }}>
              {username.charAt(0).toUpperCase()}
            </Avatar>
          </Box>
          <Box paddingLeft={2}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="subtitle1">{username}</Typography>
          </Box>
        </Box>
        <Box>
          <Paper elevation={6} sx={{ m: 2 }}>
            <Typography variant="h4">Favorite races</Typography>
            <Box
              sx={{
                display: 'flex',
                minHeight: 200,
                flexDirection: 'row',
                overflowX: 'auto',
              }}
            >
              {favorites.races.length == 0 ? (
                <Typography
                  variant="h6"
                  sx={{ textAlign: 'center', alignSelf: 'center', pl: 2 }}
                >
                  {name} does not have any favorite races :(
                </Typography>
              ) : (
                favorites.races.map((race) => (
                  <RaceCard key={race.id} race={race} />
                ))
              )}
            </Box>
          </Paper>
          <Paper elevation={6} sx={{ m: 2 }}>
            <Typography variant="h4">Favorite Drivers</Typography>
            <Box
              sx={{
                display: 'flex',
                minHeight: 200,
                flexDirection: 'row',
                overflowX: 'auto',
              }}
            >
              {favorites.drivers.length == 0 ? (
                <Typography
                  variant="h6"
                  sx={{ textAlign: 'center', alignSelf: 'center', pl: 2 }}
                >
                  {name} does not have any favorite drivers :(
                </Typography>
              ) : (
                favorites.drivers.map((driver) => (
                  <DriverCard key={driver.id} driver={driver} />
                ))
              )}
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Container>
  );
};
export default UserPage;
