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

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import { newUserRegister } from '@/service/UserService';
import { gridSpacing } from '@/store/constant';
import FormikControl from '@/component/formik/FormikControl';
import AnimateButton from '@/ui-component/extended/AnimateButton';

// redux toolkit

// ===========================|| FIREBASE - REGISTER ||=========================== //

const NewUserForm = ({ ...others }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [click, setClick] = useState(false);

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
    primaryContactNo: '',
    sector: 'Furniture',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(20).required('First name is required'),
    sector: Yup.string().required('Please select sector'),
    primaryContactNo: Yup.string()
      .max(10)
      .required('Contact number is required'),
    emailId: Yup.string()
      .email('Must be a valid email')
      .max(32)
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password length must be minimum 8 and max 16')
      .max(16, 'Password length must be minimum 8 and max 16')
      .required('Password is required'),
  });

  const onSubmit = (values) => {
    newUserRegister(values).then((data) => {
      if (data.reason) {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: data.message,
            variant: 'alert',
            alertSeverity: 'error',
          })
        );
      } else {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: 'User Created',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );
        navigate('/login');
      }
    });
    dispatch();
    setClick(true);
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
              Create User with Email address
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}>
        {(formik) => {
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
                {/* <Grid item xs={12} sm={6}>
                  <FormikControl
                    control="select"
                    name="sector"
                    label="Sector"
                    options={BusinessDomainOption}
                  />
                </Grid> */}
                <Grid item xs={12} sm={12}>
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
                    color='secondary'
                    disabled={click}>
                    Create User
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

export default NewUserForm;
