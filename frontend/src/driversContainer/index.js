import { useQuery  } from '@apollo/client';
import { CircularProgress, Container, Pagination, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { GET_DRIVERS } from '../queries';
import DriverCard from './DriverCard';
import Link from '@mui/material/Link';
import DriverFilterBar from '../components/DriverFilterBar';

const DriversContainer = () =>{
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchTeam, setSearchTeam] = useState('');
  const [searchYears, setSearchYears] = useState('');
  const {data, loading, refetch} = useQuery(GET_DRIVERS,{
    variables:{
      offset: (page -1)* 12,
      limit: 12,
      filters:{
        name: searchName,
        team: searchTeam
      }
      
    }
  });

  const handleSearch = () =>{
    refetch();
  };

  const handleChange = (_event, value) =>{
    if(value !== page){
      setPage(value);
    }
  };

  useEffect(() =>{
    const pages = Math.ceil(data?.getDrivers?.driverCount/12);
    setPageCount(pages);
  },[data]);

  useEffect(() =>{
    refetch();

  },[page]);

  if(loading){
    return(
      <CircularProgress/>
    );
  }
  const drivers = data?.getDrivers?.drivers? data?.getDrivers?.drivers: [];
  return(
    <Container maxWidth="xl" >
      <Typography variant="h2" textAlign="center">
        Drivers ordered by age
      </Typography>
      <DriverFilterBar 
      onSearchButton={handleSearch} 
      setSearchName={setSearchName} 
      searchName={searchName}
      setSearchTeam={setSearchTeam} 
      searchTeam={searchTeam}
      setSearchYears={setSearchYears} 
      searchYears={searchYears}/>
      
      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        {drivers.length > 0? drivers.map((driver) => 
          <Link key={driver.id} component={RouterLink} underline="none" to={`/drivers/${driver.id}`}>
            <DriverCard driver={driver} />
          </Link>): 
          <Typography>No drivers found with {searchName}</Typography>}

      </Box>

      <Box display="flex" flexDirection="row" flexWrap="wrap" justifyContent="center">
        <Pagination count={pageCount} value={page ? page : ' '}  color="primary" onChange={handleChange} size="large" boundaryCount={2}/>
      </Box>
    </Container>
  );
};

export default DriversContainer;