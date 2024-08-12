// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { forgetPassword } from '@/service/UserService';
import FormikControl from '@/component/formik/FormikControl';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import { setEmailIdToLocal, setTypeToLocal } from '@/service/ServiceUtil';

// ========================|| FORGOT PASSWORD ||======================== //

const AuthForgotPassword = ({ ...others }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    emailId: '',
  };

  const validationSchema = Yup.object().shape({
    emailId: Yup.string()
      .email('Must be a valid email')
      .min(10, 'Email should be of minimum 10 characters length')
      .max(40, 'Email length should not exceed 40 characters')
      .required('Field is required'),
  });

  const onSubmit = (values) => {
    //dispatch(REGISTER(values));
    forgetPassword(values).then((data) => {
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
            message: 'Otp is shared on registered email address',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );
        setEmailIdToLocal(values.emailId);
        setTypeToLocal('RESET');
        navigate('/code-verification');
      }
    });
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
              name='emailId'
              label='Email Address / Username'
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
                  Send Mail
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthForgotPassword;
