import { Alert, Fade } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import useNotification from '../hooks/useNotifcation';

//TODO: ei näytä jos message ei vaihu
const Notification = () => {
  const { severity, message } = useNotification();
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setIsShown(true);
    const timer = setTimeout(() => {
      setIsShown(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [message])

  return (
    <Fade in={isShown} sx={{ position: 'absolute', margin: 1 }}>
      <Alert variant="filled" severity={severity}>{message}</Alert>
    </Fade>
  )
}

export default Notification
