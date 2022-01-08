import React, { useEffect } from 'react';
import useToggle from '../../hooks/useToggle';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN } from '../../queries';
import { useHistory } from 'react-router-dom';
import useUserToken from '../../hooks/useUserToken';
import useNotification from '../../hooks/useNotifcation';
import { Box, Button, Collapse, Typography } from '@mui/material';

const Login = () => {
  const [isLogInForm, setLogInForm] = useToggle();
  const [openInfo, setOpenInfo] = useToggle(false);
  const { setSuccess, setError } = useNotification();
  const [login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });
  const [createUser, userResult] = useMutation(CREATE_USER, {
    onError: (error) => {
      setError(error.graphQLErrors[0].message);
    }
  });
  const { token, dispatch } = useUserToken();
  const history = useHistory();

  useEffect(() => {
    if (loginResult.data) {
      const newToken = loginResult.data.login.value;
      const favorites = JSON.stringify(loginResult.data.login.user.favorites);
      const username = loginResult.data.login.user.username;
      dispatch({ type: 'set', token: newToken, favorites, username });
      localStorage.setItem('f1history-token', newToken);
      localStorage.setItem('f1history-favorites', favorites);
      localStorage.setItem('f1history-username', username);
      setSuccess('Login successful!');
      history.push('/');
    }
  }, [loginResult.data]);

  useEffect(() => {
    if (userResult.data) {
      setSuccess('User created! You can login now');
      setLogInForm();
    }
  }, [userResult.data]);

  const onSubmit = (values) => {
    if (isLogInForm) {
      login({
        variables: {
          input: {
            username: values.username,
            password: values.password
          }
        }
      });
    }
    else {
      createUser({
        variables: {
          input: {
            name: values.name,
            username: values.username,
            password: values.password
          }
        }
      });
    }
  };

  if (token) {
    history.push('/');
  }

  return (
    <>
      {isLogInForm ?
        <LoginForm setLogInForm={setLogInForm} onSubmit={onSubmit} /> :
        <SignupForm setLogInForm={setLogInForm} onSubmit={onSubmit} />
      }
      <Box sx={{width:250, textAlign:'center', mt: 4}}>
        <Button onClick={setOpenInfo} variant="contained" sx={{width:'100%', p:2}}>
          <Typography>Why make an account?</Typography>
        </Button>
        <Collapse in={openInfo} sx={{bgcolor:'info.main'}}>
          <Typography color="black" sx={{p:1}}>With an account, you can save your favorite races and drivers. You can share a link to your page with others and show them who you support and what races were worth watching!</Typography>
        </Collapse>
      </Box>
    </>
  );
};

export default Login;
