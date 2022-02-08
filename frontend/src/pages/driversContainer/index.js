import { useQuery } from '@apollo/client';
import { CircularProgress, Container, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect, useRef } from 'react';
import { GET_DRIVERS } from '../../queries';
import DriverCard from './DriverCard';
import DriverFilterBar from '../../components/DriverFilterBar';
import useUserToken from '../../hooks/useUserToken';

const DriversContainer = () => {
  const [drivers, setDrivers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [searchName, setSearchName] = useState('');
  const [searchTeam, setSearchTeam] = useState([]);
  const [bottomReached, setBottomReached] = useState(false);
  const [moreDrivers, setMoreDrivers] = useState(true);
  const { favorites } = useUserToken();
  const [searchYears, setSearchYears] = useState(NaN);
  const [sortingOrder, setSortingOrder] = useState({
    field: 'age',
    order: 'desc',
  });
  const [searchNationality, setSearchNationality] = useState('');
  const { data, loading, refetch, fetchMore, error } = useQuery(GET_DRIVERS, {
    variables: {
      offset: 0,
      limit: 12,
      filters: {
        name: searchName,
        teams: searchTeam,
        year: !isNaN(searchYears) ? searchYears : undefined,
        nationality: searchNationality,
      },
      sort: sortingOrder,
    },
  });
  const listInnerRef = useRef();

  const handleSearch = ({ name, year, nationality, sort, teams }) => {
    setDrivers([]);
    setOffset(0);
    setSearchName(name);
    setSearchTeam(teams);
    setSearchYears(!isNaN(parseInt(year)) ? parseInt(year) : undefined);
    setSearchNationality(nationality);
    setBottomReached(true);
    const sortArr = sort.split(':');
    setSortingOrder({ field: sortArr[0], order: sortArr[1] });
    refetch().then(
      (newData) => {
        setDrivers(newData.data.getDrivers.nodes);
        setMoreDrivers(newData.data.getDrivers.pageInfo.hasNextPage);
        setBottomReached(false);
      },
      (reason) => console.error(reason)
    );
  };

  const onScroll = () => {
    if (listInnerRef.current && moreDrivers) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight + 2000 > scrollHeight && !bottomReached) {
        setBottomReached(true);
        const newOffset = offset + 1;
        setOffset(newOffset);
        fetchMore({
          variables: {
            offset: newOffset * 12,
            limit: 12,
            filters: {
              name: searchName,
              teams: searchTeam,
              year: !isNaN(searchYears) ? searchYears : undefined,
              nationality: searchNationality,
            },
            sort: sortingOrder,
          },
        }).then((newData) => {
          setDrivers([...drivers, ...newData.data.getDrivers.nodes]);
          setMoreDrivers(newData.data.getDrivers.pageInfo.hasNextPage);
          setBottomReached(false);
        });
      }
    }
  };

  useEffect(() => {
    if (!loading) {
      if (drivers.length < 1) {
        setDrivers(data.getDrivers.nodes);
        setMoreDrivers(data.getDrivers.pageInfo.hasNextPage);
      }
    }
  }, [loading]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h2" textAlign="center">
        F1 DRIVERS
      </Typography>
      <DriverFilterBar
        handleSearch={handleSearch}
        setSearchName={setSearchName}
        setSearchTeam={setSearchTeam}
        setSearchYears={setSearchYears}
        setSearchNationality={setSearchNationality}
        sortingOrder={sortingOrder}
        setSortingOrder={setSortingOrder}
        refetch={refetch}
      />
      <Box
        onScroll={onScroll}
        ref={listInnerRef}
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        justifyContent="center"
        sx={{ height: 900, overflowY: 'auto' }}
      >
        {loading ? (
          <CircularProgress />
        ) : drivers.length > 0 ? (
          <>
            {drivers.map((driver) => (
              <DriverCard
                favorites={favorites}
                key={driver.id}
                driver={driver}
              />
            ))}
          </>
        ) : error ? (
          error?.graphQLErrors.map(({ message }, i) => (
            <Typography color="red" key={i}>
              {message}
            </Typography>
          ))
        ) : (
          <Typography>No drivers found those filters</Typography>
        )}
        <Box sx={{ width: '100%', textAlign: 'center', mt: 1, mb: 2 }}>
          {moreDrivers && !loading ? <CircularProgress /> : null}
        </Box>
      </Box>
    </Container>
  );
};

export default DriversContainer;
