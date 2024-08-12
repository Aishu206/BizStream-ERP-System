import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Typography,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Form, Formik } from 'formik';

// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormikControl from '@/component/formik/FormikControl';
import { isAuthenticated } from '@/service/AuthService';
import ErrorMessage from '@/component/common/ErrorMessage';
import { LOGIN } from '@/redux-toolkit/reducer/userReducer';
import { login } from '@/service/UserService';

// ===============================|| JWT LOGIN ||=============================== //

const JWTLogin = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    emailId: '',
    password: '',
    submit: null,
  };
 
  const validationSchema = Yup.object().shape({
    emailId: Yup.string()
      .email('Must be a valid email')
      .min(10 ,'Email should be of minimum 10 characters length')
      .max(40, 'Email length should not exceed 40 characters')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password should be at least 8 characters')
      .max(16, 'Password length should not exceed 16 characters')
      .required('Password is required'),
  });
  const user = isAuthenticated();

  const onSubmit = (values) => {
    console.log('Values : ', values);
    login(values);
    dispatch(LOGIN(values));
  };

  useEffect(() => {
    if (user) {
      if (user && user.role === 'ROLE_ADMIN') {
        navigate('/dashboard/default');
      } else {
        navigate('/dashboard/default');
      }
    }
  }, [user, navigate]);

  const loadingMessage = () => {
    return (
      auth.loading && (
        <Box sx={{ display: 'flex' }}>
          <CircularProgress variant='determinate' />
        </Box>
      )
    );
  };

  const logInForm = () => {
    return (
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {() => {
            return (
              <Form autoComplete='off'>
                <InputLabel>Email Address / Username</InputLabel>
                <FormikControl control='input' type='email' name='emailId' />
                <br />
                <InputLabel>Password</InputLabel>
                <FormikControl
                  control='input'
                  type={showPassword ? 'text' : 'password'}
                  name='password'
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

                <Grid
                  container
                  alignItems='center'
                  justifyContent='space-between'>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={checked}
                          onChange={(event) => setChecked(event.target.checked)}
                          name='checked'
                          color='primary'
                        />
                      }
                      label='Keep me logged in'
                    />
                  </Grid>
                  <Grid item>
                    <Typography
                      variant='subtitle1'
                      component={RouterLink}
                      to={'/forgot-password'}
                      color='secondary'
                      sx={{ textDecoration: 'none' }}>
                      Forgot Password?
                    </Typography>
                  </Grid>
                </Grid>
                <Box sx={{ mt: 2 }}>
                  <AnimateButton>
                    <Button
                      color='secondary'
                      fullWidth
                      size='large'
                      type='submit'
                      variant='contained'>
                      Sign In
                    </Button>
                  </AnimateButton>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  };

  return (
    <div>
      {loadingMessage()}
      <ErrorMessage error={auth.error} />
      {logInForm()}
    </div>
  );
};

export default JWTLogin;
