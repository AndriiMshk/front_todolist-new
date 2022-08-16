import React from 'react';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { loginTC } from './login-reducer';
import { Navigate } from 'react-router-dom';

export const Login: React.FC = () => {

  const dispatch = useAppDispatch();
  const isLogin = useAppSelector(state => state.login.isLogin);

  const formik = useFormik({
    validate: values => {
      if (formik.touched.email && !values.email.length) {
        return {
          email: 'Enter email',
        };
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        return {
          email: 'Invalid email address',
        };
      }
      if (formik.touched.password && !values.password.length) {
        return {
          password: 'Enter password',
        };
      }
    },
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    onSubmit: values => {
      dispatch(loginTC(values));
      formik.resetForm();
    },
  });

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Grid container justifyContent="center">
        <Grid item xs={4}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
              <FormLabel>
                <p>To log in get registered<a href="https://social-network.samuraijs.com/" target="_blank">here</a></p>
                <p>or use common test account credentials:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
              </FormLabel>
              <FormGroup>
                <TextField
                  label="Email"
                  margin="normal"
                  {...formik.getFieldProps('email')}
                  error={!!formik.errors.email}
                  helperText={formik.errors.email}
                />
                <TextField
                  label="Password"
                  margin="normal"
                  autoComplete="off"
                  type="password"
                  {...formik.getFieldProps('password')}
                  error={!!formik.errors.password}
                  helperText={formik.errors.password}
                />
                <FormControlLabel
                  label="Remember me"
                  control={
                    <Checkbox
                      {...formik.getFieldProps('rememberMe')}
                      checked={formik.values.rememberMe}
                    />}
                />
                <Button type="submit" variant="contained" color="primary">Login</Button>
              </FormGroup>
            </FormControl>
          </form>
        </Grid>
      </Grid>
    </>
  );
};