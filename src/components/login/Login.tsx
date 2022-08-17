import React from 'react';
import { Navigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginActions } from './';
import { useAppSelector } from '../../app/store';
import { useActions } from '../common/hooks/useActions';
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';

export const Login: React.FC = () => {

  const { login } = useActions(loginActions);

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
      login(values);
      formik.resetForm();
    },
  });

  if (isLogin) {
    return <Navigate to="/" replace />;
  }

  return (
      <Grid container justifyContent="center" item xs={4}>
          <form onSubmit={formik.handleSubmit}>
            <FormControl>
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
  );
};