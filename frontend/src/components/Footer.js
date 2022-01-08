import { Box, Divider, Link } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box sx={{mt:5}}>
      <Divider />
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', height: 100, alignItems: 'center' }}>
        Site created by Me :) - <Link href='https://github.com/Villee00'>Github</Link>
      </Box>
    </Box>
  );
};

export default Footer;
