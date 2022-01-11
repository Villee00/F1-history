import { useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import useNotification from '../hooks/useNotifcation';
import { ADD_FAVORITE } from '../queries';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import useUserToken from '../hooks/useUserToken';
import { LoadingButton } from '@mui/lab';


const FavoriteButton = ({driverId=null, raceId=null}) => {
  const { setSuccess, setError } = useNotification();
  const { favorites, token, dispatch } = useUserToken();
  const [buttonLoading, setButtonLoading] = useState(false);
  const [favorite, {data, loading}] = useMutation(ADD_FAVORITE, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });

  const onClick = () =>{
    setButtonLoading(true);
    favorite({
      variables:{
        driverId,
        raceId
      }
    });
  };

  useEffect(() => {
    if(!loading && data){
      try {
        const newFavorites = JSON.stringify(data.addFavorite.favorites);
        dispatch({ type: 'set', favorites: newFavorites});
        localStorage.setItem('f1history-favorites', newFavorites);
        setSuccess('Changed Favorites!');
        setButtonLoading(false);
      } catch (error) {
        setSuccess('Error adding to favorites ' + error.message);
      }
    }
  }, [loading]);

  if(!token)
    return null;

  if(favorites.drivers.some(d => d.id === driverId) || favorites.races.some(r => r.id === raceId)){
    return (
      <LoadingButton id="favoriteBtn" loadingPosition="start" loading={buttonLoading} onClick={onClick} size="large" sx={{ width: '100%' }} startIcon={<StarIcon />}>unfavorite</LoadingButton>
    );
  }
  return (
    <LoadingButton id="favoriteBtn" loadingPosition="start" loading={buttonLoading} onClick={onClick} size="large" sx={{ width: '100%' }} startIcon={<StarBorderIcon />}>favorite</LoadingButton>
  );
};

export default FavoriteButton;
