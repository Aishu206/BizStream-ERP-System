import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';

import { useDispatch } from 'react-redux';
// third party
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { gridSpacing } from '@/store/constant';

import { BusinessDomainOption } from '../../constant/user';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormikControl from '@/component/formik/FormikControl';
import { createProfile } from '@/service/ProfileService';
import { getPasscode } from '@/service/UserService';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import { setEmailIdToLocal, setTypeToLocal } from '@/service/ServiceUtil';

// ===========================|| FIREBASE - REGISTER ||=========================== //

const JWTRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    emailId: '',
    password: '',
    organizationName: '',
    primaryContactNo: '',
    sector: 'Furniture',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(20).required('Field is required'),
    sector: Yup.string().required('Please select a sector'),
    primaryContactNo: Yup.string()
      .min(10, 'Contact number should be up to 10 digits')
      .max(10, 'Contact number should be up to 10 digits')
      .required('Field is required'),
    organizationName: Yup.string()
      .max(100, 'Organization name should not exceed 100 characters')
      .required('Field is required'),
    emailId: Yup.string()
      .email('Must be a valid email')
      .min(10, 'Email should be of minimum 10 characters length')
      .max(40, 'Email length should not exceed 40 characters')
      .required('Field is required'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters')
      .max(16, 'Password length should not exceed 16 characters')
      .required('Field is required'),
  });

  const onSubmit = (values) => {
    //dispatch(REGISTER(values));
    createProfile(values).then((data) => {
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
            message: 'Otp is shared on registered email address to verify.',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );
        getPasscode(data);
        setEmailIdToLocal(data.emailId);
        setTypeToLocal('REGISTER');
        navigate('/code-verification');
      }
    });

    dispatch();
  };

  return (
    <>
      <Grid container direction='column' justifyContent='center' spacing={2}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='center'>
          <Box sx={{ mb: 2 }}>
            <Typography variant='subtitle1'>
              Sign up with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {() => {
          return (
            <Form autoComplete='off'>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control='input'
                    name='firstName'
                    label='First Name'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control='input'
                    name='lastName'
                    label='Last Name'
                  />
                </Grid>
              </Grid>
              <br />
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control='select'
                    name='sector'
                    label='Sector'
                    options={BusinessDomainOption}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikControl
                    control='input'
                    name='primaryContactNo'
                    label='Contact Number'
                  />
                </Grid>
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <FormikControl
                  control='input'
                  name='organizationName'
                  label='Organization Name'
                />
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <FormikControl
                  control='input'
                  name='emailId'
                  label='Email Address / Username'
                />
              </Grid>
              <br />
              <Grid item xs={12} sm={12}>
                <FormikControl
                  control='input'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
                  label='Password'
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
              </Grid>

              <Box sx={{ mt: 2 }}>
                <AnimateButton>
                  <Button
                    disableElevation
                    fullWidth
                    size='large'
                    type='submit'
                    variant='contained'
                    color='secondary'>
                    Sign up
                  </Button>
                </AnimateButton>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default JWTRegister;
