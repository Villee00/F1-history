/* eslint-disable react/prop-types */
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary
}));

const RaceCard = ({race}) =>{

  const date = new Date(race.date);
  return(
    <Card sx={{ maxWidth: 450, borderRadius: 3, height: 300, margin: 2, boxShadow: 10}}>
      <CardMedia
        component="img"
        height="400"
        image={race.pictureLink}
        alt="green iguana"
        sx={{height: 200, objectFit:'contain'}}
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
          {race.grandPrix} 
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ placeContent: 'center' }}
        >
          <Item>{date.toDateString()}</Item>
          <Item>{race.weather}</Item>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="large" sx={{ width: '100%' }}>Details</Button>
      </CardActions>
    </Card>
  );
};

export default RaceCard;