import React from 'react';
import SeasonCard from './SeasonCard';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Box } from '@mui/system';


const SeasonsContainer = () =>{
  const years = [];

  for (let year = 1950; year < 2020; year++) {
    years.push(year);
  }
  return(
    <Container maxWidth="xl" >
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        <div className="w-screen text-center">
          <Typography variant="h3" width="!00%"> Select a season </Typography>
        </div>
        {
          years.map(year =>
            <div key={year} className="m-5" >
              <Link to={`/seasons/${year}`}>
                <SeasonCard year={year} />
              </Link>
            </div>)}
      </Box>
    </Container>
  );
};

export default SeasonsContainer;