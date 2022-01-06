import { useQuery } from '@apollo/client';
import { Avatar, Box, CircularProgress, Container, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom';
import { GET_USER } from '../../queries';
import RaceCard from '../racesContainer/RaceCard';
import DriverCard from '../driversContainer/DriverCard'

const UserPage = () => {
  const { username } = useParams();
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      username
    }
  })
  if (loading) {
    return (
      <CircularProgress />
    )
  }
  if (error) {
    console.log(error);
    return (
      <Box>
        <Typography variant="h2">There is no users named {username}</Typography>
      </Box>
    )
  }

  const { name, favorites } = data.getUser;
  return (
    <Container fixed maxWidth="lg" sx={{ textAlign: "center" }} >
      <Paper>
        <Box flexDirection="row" display="flex" padding={2} justifyContent="center">
          <Box>
            <Avatar sx={{ width: 70, height: 70 }} />
          </Box>
          <Box paddingLeft={2}>
            <Typography variant="h5">{name}</Typography>
            <Typography variant="subtitle1">{username}</Typography>
          </Box>
        </Box>
        <Box>
          <Paper elevation={6} sx={{margin: 2}}>
            <Typography variant="h4">Favorite races</Typography>
            <Box
              sx={{ display: "flex", placeContent: 'center', minHeight: 200, flexDirection: 'row', overflowX: "auto" }}
            >
              {favorites.races.length == 0 ?
                <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center' }}>{name} dosen't have any favorite races :(</Typography> :
                favorites.races.map(race =>
                  <RaceCard key={race.id} race={race} />)}              {}
            </Box>
          </Paper>
          <Paper elevation={6}>
            <Typography variant="h4">Favorite Drivers</Typography>
            <Box
              sx={{ display: "flex", placeContent: 'center', minHeight: 200, flexDirection: 'row', overflowX: "auto" }}
            >
              {favorites.drivers.length == 0 ?
                <Typography variant="h6" sx={{ textAlign: 'center', alignSelf: 'center' }}>{name} dosen't have any favorite drivers</Typography> :
                favorites.drivers.map(driver =>
                  <DriverCard key={driver.id} driver={driver} />)}
            </Box>
          </Paper>
        </Box>
      </Paper>
    </Container>
  )
}

const dummyRaceData = {
  date: new Date(),
  pictureLink: "https://upload.wikimedia.org/wikipedia/commons/5/53/Phoenix_Grand_Prix_Route_-_1989%2C_1990.svg",
  grandPrix: "Test",
  weather: "Sunny"
}
export default UserPage
