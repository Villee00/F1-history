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
import { buildPictureURL } from '../../utils/PictureChanger'
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link as RouterLink } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { Link } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const DriverCard = ({ driver }) => {
  const picture = buildPictureURL(driver.pictureLink, 400)
  return (
    <Card sx={{ maxWidth: 270, borderRadius: 3, height: 600, margin: 2, boxShadow: 10 }}>
      <Link component={RouterLink} underline="none" to={`/drivers/${driver.id}`}>
        <CardMedia
          component="img"
          image={picture}
          alt="Driver"
          sx={{ height: 400, objectFit: 'contain' }}
        />
      </Link>
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
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
        <Button size="large" sx={{ width: '100%' }} startIcon={<StarBorderIcon />}>favorite</Button>
        <Button component={RouterLink} to={`/drivers/${driver.id}`} size="large" sx={{ width: '100%' }}>Details</Button>
      </CardActions>
    </Card>
  );
};

export default DriverCard;