import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';

const SeasonCard = ({year}) =>{

  return (
    <Card
      sx={{
        width: 250,
        textAlign: 'center',
        boxShadow: 2,
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.0), rgba(0, 0, 0, 0.7)), url(https://1000logos.net/wp-content/uploads/2021/06/F1-logo.png)',
        backgroundSize: 'cover'
      }}
    >
      <CardActionArea>
        <CardContent>
          <Typography variant="h2" color="white">
            {year}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SeasonCard;