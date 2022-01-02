import React from 'react'
import useToggle from '../hooks/useToggle'
import SignupForm from './SignupForm'
import LoginForm from './LoginForm'

const Login = () => {
  const [isLogInForm, setLogInForm] = useToggle();
  const onSubmit = (values) =>{
    console.log(values);
  }
  if(isLogInForm){
    return(
      <LoginForm setLogInForm={setLogInForm} onSubmit={onSubmit}/>
    )
  }
  else{
    return(
      <SignupForm setLogInForm={setLogInForm} onSubmit={onSubmit}/>
    )
  }
}

export default Login
