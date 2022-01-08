import { Button, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  username: yup.string('Enter your username')
    .required('Username is required'),
  password: yup.string()
    .required('Password is required')
});

const LoginForm = ({ setLogInForm, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: (values) => onSubmit(values)
  });
  return (
    <>
      <Typography variant='h4' sx={{ marginBottom: 1 }}>LOG IN</Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            id='username'
            name='username'
            label='Username'
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id='password'
            type='password'
            label='Password'
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Stack flexDirection='column'>
            <Button size='large' type="submit" variant="contained" color="success">
              Log in
            </Button>
            <Button size='medium' sx={{mt:2}} onClick={setLogInForm}>
              Sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default LoginForm;
