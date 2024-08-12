import {
  Button,
  DialogContent,
  Grid,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import FormikControl from '@/component/formik/FormikControl';
import { Form, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SNACKBAR_OPEN } from '@/store/action/actions';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import * as yup from 'yup';
// assets
import { convertBase64 } from '@/utils/BasicUtils';
import { useState, useEffect } from 'react';
import ImageUploader from '@/component/common/ImageUploader';

import {
  addVendor,
  getAllVendorKeyValue,
  updateVendor,
} from '@/service/VendorService';
import { getAllEmployeeKeyValue } from '@/service/EmployeeService';

const AddEditSaleProduct = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAddMode = !!formValues;

  const [invoiceLink, setInvoiceLink] = useState('');
  const [vendorKeyValue, setVendorKeyValue] = useState([]);
  const [employeeKeyValue, setEmployeeKeyValue] = useState([]);
  const [selectValues, setSelectValues] = useState({
    vendorId: '',
    orderBy: '',
    paidBy: '',
  });

  const initialValues = {
    amount: '',
    amountPaid: '',
    invoiceLink: '',
    description: '',
  };

  const validationSchema = yup.object({
    vendorId: yup.string().required('Vendor Name is required'),
    orderBy: yup.string().required('Order By is required'),
    amount: yup.string().required('Amount is required'),
  });

  const setImageData = async (imageData) => {
    const base64 = await convertBase64(imageData);
    setInvoiceLink(base64);
  };

  const loadAllVendorKeyValue = async () => {
    await getAllVendorKeyValue().then((data) => {
      if (data) {
        console.log('Data =====> ', data);
        setVendorKeyValue(data);
      }
    });
    await getAllEmployeeKeyValue().then((data) => {
      if (data) {
        console.log('Data =====> ', data);
        setEmployeeKeyValue(data);
      }
    });
  };

  const onSubmit = (values) => {
    console.log('Values ===>  ', values, isAddMode);
    if (!isAddMode) {
      addVendor({ ...values, invoiceLink }).then((data) => {
        if (data.error) {
          alert('Error ', data.reason);
        } else {
          onCancel();
          navigate('/app/purchase-product/list');
        }
      });
    } else {
      updateVendor(values).then((data) => {
        if (data.error) {
          alert('Error ', data.reason);
        } else {
          onCancel();
          navigate('/app/purchase-product/list');
        }
      });
    }
    dispatch({
      type: SNACKBAR_OPEN,
      open: true,
      message: 'Submit Success',
      variant: 'alert',
      alertSeverity: 'success',
    });
  };

  useEffect(() => {
    loadAllVendorKeyValue();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log('Form Values ', name, value);
    setSelectValues({ ...selectValues, [name]: value });
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent='center'>
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={
              !isAddMode
                ? 'Upload Product Sale Bill'
                : 'Update Product Sale Bill'
            }>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={12}>
                <ImageUploader
                  parentImageSet={setImageData}
                  fieldLabel='Upload Invoice'
                  field='invoiceLink'
                  accept='*'
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  select
                  fullWidth
                  id='clientId'
                  name='clientId'
                  label='Select Client'
                  value={selectValues.vendorId}
                  onChange={handleInputChange}>
                  {vendorKeyValue.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.key}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  select
                  fullWidth
                  id='orderBy'
                  name='orderBy'
                  label='Select OrderBy'
                  value={selectValues.orderBy}
                  onChange={handleInputChange}>
                  {employeeKeyValue.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.key}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  select
                  fullWidth
                  id='paidBy'
                  name='paidBy'
                  label='Select PaidBy'
                  value={selectValues.paidBy}
                  onChange={handleInputChange}>
                  {employeeKeyValue.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.key}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <br />

            <Formik
              initialValues={formValues || initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form autoComplete='off'>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control='input'
                          type='Number'
                          label='Amount'
                          name='amount'
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control='input'
                          type='Number'
                          label='Amount Paid'
                          name='amountPaid'
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <FormikControl
                          control='textarea'
                          label='Description'
                          name='description'
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

export default AddEditSaleProduct;
