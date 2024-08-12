import {
  Button,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
} from '@mui/material';
import FormikControl from '@/component/formik/FormikControl';
import { Form, Formik } from 'formik';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import * as yup from 'yup';
// assets
import LinkIcon from '@mui/icons-material/Link';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';

// redux toot-kit
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import { API } from '@/backend';

const ChangePassword = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();

  var loginDetails = JSON.parse(localStorage.getItem('user'));

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const initialValues = {
    emailId: loginDetails.emailId,
    password: '',
    confirmPassword: '',
  };

  // const validationSchema = yup.object({
  //   emailId: yup
  //     .string()
  //     .email("Enter a valid email")
  //     .required("Email is required"),
  //   ChangePassword: yup
  //     .string()
  //     .min(8, "Enter proper Aaadhar card Number")
  //     .max(16, "")
  //     .required("new password is required"),
  // });

  const validationSchema = yup.object().shape({
    emailId: yup.string().required().email(),
    password: yup
      .string()
      .min(8, 'password must have 8 characters')
      .max(16, 'Password must not exceed 16 chanracters')
      .required('new password is required'),

    confirmPassword: yup
      .string()
      .label('confirm password')
      .required()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const onSubmit = (values) => {
    console.log('Values ===>  ', values);
    console.log(values);

    dispatch(
      SNACKBAR_OPEN({
        open: true,
        message: 'Password Changed',
        variant: 'alert',
        alertSeverity: 'error',
      })
    );

    onCancel();
  };

  
  return (
    <Grid container spacing={gridSpacing} justifyContent='center'>
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title='Change Password'
            secondary={
              <SecondaryAction
                icon={<LinkIcon fontSize='small' />}
                link='https://formik.org/docs/examples/with-material-ui'
              />
            }>
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              enableReinitialize>
              {(formik) => {
                return (
                  <Form autoComplete='off'>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={12}>
                        <FormikControl control='input' name='emailId' />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control='input'
                          label='Change Password'
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
                                  {showPassword ? (
                                    <Visibility />
                                  ) : (
                                    <VisibilityOff />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control='input'
                          name='confirmPassword'
                          label='Confirm Password'
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Stack direction='row' justifyContent='flex-end'>
                          <AnimateButton>
                            <Button variant='contained' type='submit'>
                              Submit
                            </Button>
                          </AnimateButton>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Form>
                );
              }}
            </Formik>
          </MainCard>
        </DialogContent>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
