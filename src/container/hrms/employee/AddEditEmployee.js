import { useEffect, useState, useCallback } from 'react';
import { Button, DialogContent, Grid, Stack } from '@mui/material';
import FormikControl from '@/component/formik/FormikControl';
import { Form, Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import * as yup from 'yup';
// assets
import LinkIcon from '@mui/icons-material/Link';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';

// redux toot-kit
import { useDispatch, useSelector } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import {
  addEmployeeAction,
  updateEmployeeAction,
} from '@/redux-toolkit/reducer/employeeReducer';
import { getAllDesignationKeyValue } from '@/service/AdminService';

const AddEditEmployee = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAddMode = !!formValues;

  const { error, update } = useSelector((state) => state.employee);
  const [designationList, setDesignationList] = useState([]);

  const initialValues = {
    fullName: '',
    fatherName: '',
    emailId: '',
    designation: '',
    perDayWages: '',
    address: '',
    panCardNo: '',
    aadharCardNo: '',
    primaryContactNo: '',
    secondaryContactNo: '',
    country: '',
    state: '',
    pinCode: '',
    status: '',
  };

  const validationSchema = yup.object({
    emailId: yup
      .string()
      .email('Enter a valid email')
      .required('Email is required'),
    fullName: yup.string().required('Full Name is required'),
    fatherName: yup.string().required('Father Name is required'),
    aadharCardNo: yup
      .string()
      .min(12, 'Enter proper Aaadhar card Number')
      .max(12, 'Enter proper Aaadhar card Number')
      .required('Aadhar card no is required'),
    primaryContactNo: yup.string().matches(/^\d{10}$/, 'Enter a valid contact number').required('Primary Contact no is required'),
    // secondaryContactNo: yup.string().matches(/^\d{10}$/, 'Enter a valid contact number').required('Secondary Contact no is required'),
    pinCode: yup.string()
      .matches(/^[1-9]\d{5}$/, 'Enter a valid pincode')
      .required('Pincode is required'),
    perDayWages: yup.string().required('Per day wages is required'),
    
    // panCardNo: yup.string().required('Enter Pan card Number'),
    
    panCardNo: yup
    .string()
    .required('Enter Pan card Number')
    .matches(
      /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
      'Enter a valid PAN card number'
    ),
  });

  const onSubmit = async (values) => {
    console.log('Values ===>  ', values);
    console.log(values);
    if (!isAddMode) {
      const data = dispatch(
        addEmployeeAction({ dataAddEmployee: values, navigate, onCancel })
      );
      console.log("Add Employee Response :  ",data);
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
    } else {
      dispatch(
        updateEmployeeAction({ dataUpdateEmployee: values, navigate, onCancel })
      );

      if (update) {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: 'Employee updated Successfully',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );
      }
    }
  };

  const loadAllDesignation = useCallback(async () => {
    await getAllDesignationKeyValue().then((data) => {
      if (data) {
        setDesignationList(data);
      }
    });
  }, []);

  useEffect(() => {
    loadAllDesignation();
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
  }, [dispatch, error, loadAllDesignation]);

  return (
    <Grid container spacing={gridSpacing} justifyContent='center'>
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={
              !isAddMode ? 'Add Employee Detail' : 'Update Employee Detail'
            }
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
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          label='Full Name'
                          name='fullName'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          label='Father Name'
                          name='fatherName'
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
                          control='select'
                          label='Designation'
                          name='designation'
                          options={designationList}
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          type='Number'
                          name='perDayWages'
                          label='Per Day Wages'
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
                          control='input'
                          name='panCardNo'
                          label='Pan Card'
                        />
                      </Grid>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          type='Number'
                          maxLength='12'
                          label='Aadhaar Card'
                          name='aadharCardNo'
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

export default AddEditEmployee;
