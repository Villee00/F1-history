import React, { useContext, useEffect } from 'react'
import useToggle from '../../hooks/useToggle'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { useMutation } from '@apollo/client'
import { CREATE_USER, LOGIN } from '../../queries'
import { UserTokenContext } from '../../contexts/user'
import { useHistory } from 'react-router-dom'
import useUserToken from '../../hooks/useUserToken'
import { NotificationContext } from '../../contexts/alert'
import useNotification from '../../hooks/useNotifcation'

const Login = () => {
  const [isLogInForm, setLogInForm] = useToggle();
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
  const {token, dispatch } = useUserToken();
  const history = useHistory();

  useEffect(() => {
    if (loginResult.data) {
      const newToken = loginResult.data.login.value;
      const favorites = JSON.stringify(loginResult.data.login.user.favorites);
      const username = loginResult.data.login.user.username;
      dispatch({ type: 'set', token: newToken, favorites, username})
      localStorage.setItem('f1history-token', newToken);
      localStorage.setItem('f1history-favorites', favorites);
      localStorage.setItem('f1history-username', username);
      setSuccess('Login successful!');
      history.push('/');
    }
  }, [loginResult.data])

  useEffect(() => {
    if (userResult.data) {
      setSuccess("User created!");
      history.push('/login');
    }
  }, [userResult.data])

  const onSubmit = (values) => {
    if (isLogInForm) {
      login({
        variables: {
          input: {
            username: values.username,
            password: values.password
          }
        }
      })
    }
    else {
      console.log(values)
      createUser({
        variables: {
          input: {
            name: values.name,
            username: values.username,
            password: values.password
          }
        }
      })
    }
  }

  if (token) {
    history.push('/');
  }

  if (isLogInForm) {
    return (
      <LoginForm setLogInForm={setLogInForm} onSubmit={onSubmit} />
    )
  }
  else {
    return (
      <SignupForm setLogInForm={setLogInForm} onSubmit={onSubmit} />
    )
  }
}

export default Login
