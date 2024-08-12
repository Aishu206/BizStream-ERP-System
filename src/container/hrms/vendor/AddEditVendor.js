import { Button, DialogContent, Grid, Stack } from '@mui/material';
import FormikControl from '@/component/formik/FormikControl';
import { countryList } from '@/constant/CountryList';
import { indiaStateList } from '@/constant/IndiaStateList';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import * as yup from 'yup';
// assets
import LinkIcon from '@mui/icons-material/Link';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';
// import { addVendor, updateVendor } from 'service/VendorService';

// redux tool-kit
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import {
  addVendorAction,
  updateVendorAction,
} from '@/redux-toolkit/reducer/vendorReducer';
import { useEffect } from 'react';

const AddEditVendor = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, add, update } = useSelector((state) => state.vendor);

  const isAddMode = !!formValues;

  const initialValues = {
    vendorName: '',
    shopName: '',
    primaryContactNo: '',
    secondaryContactNo: '',
    orgId: '',
    emailId: '',
    address: '',
    country: '',
    state: '',
    pinCode: '',
  };

  const validationSchema = yup.object({
    emailId: yup.string()
      .email('Must be a valid email')
      .min(10 ,'Enter Valid Email')
      .max(40, 'Email length should not exceed 40 characters')
      .required('Email is required'),
    vendorName: yup
      .string()
      .min(1, 'Enter Valid Vendor Name')
      .max(50, 'Vendor name must be at most 50 characters')
      .required('Vendor name is required'),
    shopName: yup
    .string()
    .min(1, 'Enter Valid Shop Name')
    .max(80, 'Shop Name must be at most 80 characters')
    .required('Shop Name is required'),
    address: yup
    .string()
    .min(1, 'Enter Valid Address')
    .max(300, 'Address must be at most 300 characters')
    .required('Address is required'),
    primaryContactNo: yup
      .string()
      .matches(/^\d{10}$/, 'Enter valid Contact no')
      .required('Primary Contact no is required'),
    // secondaryContactNo: yup
    //   .string()
    //   .matches(/^\d{10}$/, 'Enter Valid Contact no')
    //   .required('Secondary Contact no is required'),
    pinCode: yup
      .string()
      .matches(/^\d{6}$/, 'Enter Valid Pincode')
      .required('Pin code is required'),
  });

  const onSubmit = (values) => {
    console.log('Values ===>  ', values, isAddMode);
    if (!isAddMode) {
      dispatch(addVendorAction({ dataAddVendor: values, navigate, onCancel }));
      if (error) {
        console.log('ERROR : ', error);
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: error,
            variant: 'alert',
            alertSeverity: 'error',
          })
        );
      }
    } else {
      dispatch(
        updateVendorAction({ dataUpdateVendor: values, navigate, onCancel })
      );

      if (update) {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: 'Vendor updated Successfully',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );
      }
    }
  };

  useEffect(() => {
    if (error) {
      dispatch(
        SNACKBAR_OPEN({
          open: true,
          message: error,
          variant: 'alert',
          alertSeverity: 'error',
        })
      );
    }
  }, [dispatch, error]);

  return (
    <Grid container spacing={gridSpacing} justifyContent='center'>
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={!isAddMode ? 'Vendor Registrationnn' : 'Update Vendor'}
            secondary={
              <SecondaryAction
                icon={<LinkIcon fontSize='small' />}
                link='https://formik.org/docs/examples/with-material-ui'
              />
            }>
            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form autoComplete='off'>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          label='Vendor Name'
                          name='vendorName'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          name='emailId'
                          label='Email Id'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          label='Shop Name'
                          name='shopName'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          label='Address'
                          name='address'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          type='Number'
                          name='primaryContactNo'
                          label='Primary Contact'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          type='Number'
                          label='Secondary Contact'
                          name='secondaryContactNo'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='select'
                          name='country'
                          label='Country'
                          options={countryList}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='select'
                          label='State'
                          name='state'
                          options={indiaStateList}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          name='pinCode'
                          label='Pincode'
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Stack direction='row' justifyContent='flex-end'>
                          <AnimateButton>
                            <Button variant='contained' type='submit'>
                              {!isAddMode ? 'Submit' : 'Update'}
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

export default AddEditVendor;
