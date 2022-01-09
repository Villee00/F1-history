import { Box, Divider, Link, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  return (
    <Box sx={{mt:5, width:'100%', display:'flex', textAlign:'center', justifyContent:'center', pt:5}}>
      <Divider />
      <Box sx={{ width: '75%', display: 'flex', justifyContent: 'center', height: 100, alignItems: 'center', flexDirection:'column'}}>
        <Typography variant="subtitle2">Data gathered from <Link href='https://ergast.com/mrd/'>Ergast</Link> and <Link href='https://wikipedia.org'>Wikipedia</Link></Typography>
        <Typography variant="subtitle2">Pictures are from <Link href='https://commons.wikimedia.org/'>Wikimedia Commons</Link> and <Link href='https://pixabay.com/'>Pixabay</Link></Typography>
        <Typography variant="subtitle2">Site created by Me :) - <Link href='https://github.com/Villee00'>Github</Link></Typography>
        <Typography variant="subtitle2" sx={{pt:1}}>All names, brands and otherwise copyrighted material are and remain property of their respective owners.</Typography>
        <Typography variant="subtitle2" sx={{pt:1}}>This website is unofficial and is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
