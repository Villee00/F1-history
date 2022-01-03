import React, { useEffect } from 'react'
import useToggle from '../hooks/useToggle'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'
import { UserTokenContext } from '../contexts/user'
import { useHistory } from 'react-router-dom'
import useUserToken from '../hooks/useUserToken'

const Login = () => {
  const [isLogInForm, setLogInForm] = useToggle();
  const [login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  });
  const [createUser, userResult] = useMutation(LOGIN);
  const {state:{token}, dispatch} = useUserToken();
  const history = useHistory();

  useEffect(() => {
    if (loginResult.data) {
      const newToken = loginResult.data.login.value;
      console.log(newToken)
      dispatch({type: 'set', token: newToken})
      localStorage.setItem('f1history-token', newToken)
      history.push('/');
    }
  }, [loginResult.data])

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
      createUser({
        variables:
        {
          name: values.name,
          username: values.username,
          password: values.password
        }
      })
    }
  }

  if(token){
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
