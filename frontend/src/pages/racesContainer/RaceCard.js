/* eslint-disable react/prop-types */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { buildPictureURL } from '../../utils/PictureChanger';
import { Box, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FavoriteButton from '../../components/FavoriteButton';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const RaceCard = ({ race, year, info = true }) => {
  const date = new Date(race.date);
  const picture = buildPictureURL(race.picture.link, 400);
  return (
    <Card
      sx={{
        minHeight: 300,
        maxWidth: 300,
        minWidth: 300,
        borderRadius: 3,
        margin: 2,
        boxShadow: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}
      cy-data="race-card"
    >
      <CardActionArea
        component={RouterLink}
        to={`/seasons/${year}/${encodeURIComponent(race.grandPrix)}`}
      >
        <Box>
          <CardMedia
            component="img"
            sx={{ height: 200, objectFit: 'contain' }}
            image={picture}
            alt="Circuit layout"
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {race.grandPrix}
          </Typography>
          {info ? (
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              spacing={2}
              sx={{ placeContent: 'center' }}
            >
              <Item>{date.toDateString()}</Item>
              <Item>{race.weather}</Item>
            </Stack>
          ) : null}
        </CardContent>
      </CardActionArea>
      <CardActions>
        <FavoriteButton raceId={race.id} />
      </CardActions>
    </Card>
  );
};

export default RaceCard;
