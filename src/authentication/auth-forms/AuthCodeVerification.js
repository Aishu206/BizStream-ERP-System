// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// third party
import * as Yup from 'yup';
import { Formik, Form } from 'formik';

// project imports
import FormikControl from '@/component/formik/FormikControl';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';

// project imports
import AnimateButton from '@/ui-component/extended/AnimateButton';
import { verifyCode } from '@/service/UserService';
import { getTypeFromLocal } from '@/service/ServiceUtil';

// =======================||   CODE VERIFICATION ||======================= //

const AuthCodeVerification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const type = getTypeFromLocal();

  const initialValues = {
    code1: '',
    code2: '',
    code3: '',
    code4: '',
    code5: '',
    code6: '',
  };

  const validationSchema = Yup.object().shape({
    code1: Yup.string().required('required'),
    code2: Yup.string().required('required'),
    code3: Yup.string().required('required'),
    code4: Yup.string().required('required'),
    code5: Yup.string().required('required'),
    code6: Yup.string().required('required'),
  });

  const onSubmit = (values) => {
    const finalCode = prepareFinalCode(values);
    verifyCode(finalCode, type).then((data) => {
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
            message: 'Otp is verified.',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );

        const type = getTypeFromLocal();
        type == 'REGISTER' ? navigate('/login') : navigate('/reset-password');
      }
    });

    dispatch();
  };

  const prepareFinalCode = (obj) => {
    let temp = '';
    for (let key in obj) {
      temp += obj[key];
    }
    return temp;
  };

  const inputSX = {
    ...theme.typography.customInput,
    '& > div > input': {
      p: { xs: 1.5, md: 2 },
      textAlign: 'center',
    },
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {() => {
        return (
          <Form autoComplete='off'>
            <Grid
              container
              alignItems='center'
              justifyContent='space-between'
              spacing={2}>
              <Grid item xs={2}>
                <FormikControl
                  control='input'
                  margin='normal'
                  name='code1'
                  sx={inputSX}
                  placeholder='1'
                />
              </Grid>
              <Grid item xs={2}>
                <FormikControl
                  control='input'
                  margin='normal'
                  name='code2'
                  sx={inputSX}
                  placeholder='9'
                />
              </Grid>
              <Grid item xs={2}>
                <FormikControl
                  control='input'
                  margin='normal'
                  name='code3'
                  sx={inputSX}
                  placeholder='9'
                />
              </Grid>
              <Grid item xs={2}>
                <FormikControl
                  control='input'
                  margin='normal'
                  name='code4'
                  sx={inputSX}
                  placeholder='7'
                />
              </Grid>
              <Grid item xs={2}>
                <FormikControl
                  control='input'
                  margin='normal'
                  name='code5'
                  sx={inputSX}
                  placeholder='9'
                />
              </Grid>
              <Grid item xs={2}>
                <FormikControl
                  control='input'
                  margin='normal'
                  name='code6'
                  sx={inputSX}
                  placeholder='4'
                />
              </Grid>
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
                  Continue
                </Button>
              </AnimateButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AuthCodeVerification;
