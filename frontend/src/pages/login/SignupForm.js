import { Button, Stack, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import * as yup from 'yup';

const validationSchema = yup.object({
  name: yup
    .string('Enter your name')
    .required('Name is required')
    .min(3, 'Username must 3 to 10 letters.')
    .max(10, 'Username must 3 to 10 letters.'),
  username: yup.string('Enter your username').required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirm: yup
    .string('enter password again')
    .required('Password confirmation is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const SignupForm = ({ setLogInForm, onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: (values) => onSubmit(values),
  });

  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: 1 }}>
        SIGN UP
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <TextField
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            id="username"
            name="username"
            label="Username (used to login)"
            value={formik.values.username}
            onChange={formik.handleChange}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            id="password"
            type="password"
            label="Password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            type="password"
            label="Password Confirmation"
            id="passwordConfirm"
            name="passwordConfirm"
            value={formik.values.passwordConfirm}
            onChange={formik.handleChange}
            error={
              formik.touched.passwordConfirm &&
              Boolean(formik.errors.passwordConfirm)
            }
            helperText={
              formik.touched.passwordConfirm && formik.errors.passwordConfirm
            }
          />
          <Stack flexDirection="column">
            <Button
              type="submit"
              variant="contained"
              color="success"
              size="large"
            >
              Sign up
            </Button>
            <Button onClick={setLogInForm} sx={{ mt: 2 }}>
              Log in
            </Button>
          </Stack>
        </Stack>
      </form>
    </>
  );
};

export default SignupForm;
