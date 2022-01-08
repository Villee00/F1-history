import { useContext } from 'react';
import { UserTokenContext } from '../contexts/user';

const useUserToken = () => {
  const context = useContext(UserTokenContext);
  return context;
};

export default useUserToken;
