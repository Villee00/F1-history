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

const DriverCard = () =>{

  return(
    <Card sx={{ maxWidth: 270, borderRadius: 3 }}>
      <CardMedia
        component="img"
        height="400"
        image="https://upload.wikimedia.org/wikipedia/commons/d/d5/Lando_Norris_Formula_1_Driver_%2849379469418%29_%28cropped%29_%28cropped%29.jpg"
        alt="green iguana"
      />
      <CardContent >
        <Typography gutterBottom variant="h5" component="div">
        Lando Norris
        </Typography>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
          sx={{ placeContent: 'center' }}
        >
          <Item>80 Races</Item>
          <Item>+5 positions gained</Item>
        </Stack>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ width: '100%' }}>Details</Button>
      </CardActions>
    </Card>
  );
};

export default DriverCard;