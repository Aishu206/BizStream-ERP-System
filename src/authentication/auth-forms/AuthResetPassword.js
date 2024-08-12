import { useState } from 'react';
import { Box, Button, IconButton, InputAdornment } from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useTheme } from '@mui/material/styles';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import FormikControl from '@/component/formik/FormikControl';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import { resetPassword } from '@/service/UserService';
import {
  removeEmailIdToLocal,
  removeTypeFromLocal,
} from '@/service/ServiceUtil';

const AuthResetPassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .max(16, 'Password length should not exceed 16 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const onSubmit = (values) => {
    //dispatch(REGISTER(values));
    console.log('Valuess ==> ', values);
    resetPassword(values).then((data) => {
      console.log('Data : ', data);
      if (data.reason) {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: data.error,
            variant: 'alert',
            alertSeverity: 'error',
          })
        );
      } else {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: 'Password is changed successfully',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );
      }
    });
    removeEmailIdToLocal();
    removeTypeFromLocal();
    navigate('/login');
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => {
        return (
          <Form autoComplete='off' {...others}>
            <FormikControl
              control='input'
              type={showPassword ? 'text' : 'password'}
              name='password'
              label='Password'
              sx={{ ...theme.typography.customInput }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                      size='large'>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormikControl
              control='input'
              type={showPassword ? 'text' : 'password'}
              name='confirmPassword'
              label='Confirm Password'
              sx={{ ...theme.typography.customInput }}
            />

            <Box sx={{ mt: 2 }}>
              <AnimateButton>
                <Button
                  disableElevation
                  fullWidth
                  size='large'
                  type='submit'
                  variant='contained'
                  color='secondary'>
                  Reset Password
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthResetPassword;
