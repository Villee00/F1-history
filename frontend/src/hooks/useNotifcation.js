import React, { useContext } from 'react'
import { NotificationContext } from '../contexts/alert';

const useNotification = () => {
  const value = useContext(NotificationContext);
  return value;
}

export default useNotification
