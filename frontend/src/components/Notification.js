import { Alert, Fade } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import useNotification from '../hooks/useNotifcation';

const Notification = () => {
  const { severity, clear, message } = useNotification();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);
    const timer = setTimeout(() => {
      setIsShown(false);
      setTimeout(() =>{
        clear();
      }, 500);
    }, 3000);

    return () => {
      clearTimeout(timer);};
  }, [message])

  if(!severity || !message)
    return null
  return (
    <Fade in={isShown} sx={{ position: 'absolute', margin: 1 }}>
      <Alert variant="filled" severity={severity}>{message}</Alert>
    </Fade>
  )
}

export default Notification
