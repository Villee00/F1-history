import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { buildPictureURL } from '../../utils/PictureChanger';
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import FavoriteButton from '../../components/FavoriteButton';
import useUserToken from '../../hooks/useUserToken';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DriverCard = ({ driver }) => {
  const { favorites, token } = useUserToken();
  let picture = driver.picture.link;
  if (
    picture !==
    'https://cdn.pixabay.com/photo/2014/04/03/10/07/checkered-flag-309862_960_720.png'
  )
    picture = buildPictureURL(picture, 400);
  return (
    <Card
      sx={{
        maxWidth: 270,
        borderRadius: 3,
        minWidth: 250,
        height: 600,
        margin: 2,
        boxShadow: 10,
      }}
      cy-data="driver-card"
    >
      <Link
        component={RouterLink}
        underline="none"
        to={`/drivers/${driver.id}`}
      >
        <CardMedia
          component="img"
          image={picture}
          alt="Driver"
          sx={{ height: 400, objectFit: 'contain' }}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div" cy-data="driver-name">
          {driver.fullName}
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ placeContent: 'center' }}
        >
          <Item>{driver.racesDriven} Races</Item>
          <Item>{driver.positionsGainedCareer} positions gained</Item>
        </Stack>
      </CardContent>
      <CardActions>
        {token ? (
          <FavoriteButton favorites={favorites} driverId={driver.id} />
        ) : null}
        <Button
          component={RouterLink}
          to={`/drivers/${driver.id}`}
          size="large"
          sx={{ width: '100%' }}
        >
          Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default DriverCard;
