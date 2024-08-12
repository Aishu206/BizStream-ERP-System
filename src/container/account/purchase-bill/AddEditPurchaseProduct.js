import { Button, DialogContent, Grid, Stack } from '@mui/material';

import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { convertBase64 } from '@/utils/BasicUtils';
import { getAllVendorKeyValue } from '@/service/VendorService';
import { getAllEmployeeKeyValue } from '@/service/EmployeeService';
import { addPurchasingProduct } from '@/service/PurchasingService';
import { SNACKBAR_OPEN } from '@/store/action/actions';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import ImageUploader from '@/component/common/ImageUploader';
import { Form, Formik } from 'formik';
import FormikControl from '@/component/formik/FormikControl';
import AnimateButton from '@/ui-component/extended/AnimateButton';

const AddEditPurchaseProduct = ({ onCancel, formValues, add }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAddMode = !!formValues;

  const [invoiceLink, setInvoiceLink] = useState('');
  const [vendorKeyValue, setVendorKeyValue] = useState([]);
  const [employeeKeyValue, setEmployeeKeyValue] = useState([]);

  let initialValues = {
    vendorId: '',
    orderBy: '',
    paidBy: '',
    amount: '',
    amountPaid: '',
    invoiceLink: '',
    description: '',
  };

  const validationSchema = yup.object({
    amount: yup.string().required('Amount is required'),
  });

  const setImageData = async (imageData) => {
    const base64 = await convertBase64(imageData);
    setInvoiceLink(base64);
  };

  const loadAllVendorKeyValue = async () => {
    await getAllVendorKeyValue().then((data) => {
      if (data) {
        setVendorKeyValue(data);
      }
    });
    await getAllEmployeeKeyValue().then((data) => {
      if (data) {
        setEmployeeKeyValue(data);
      }
    });
  };

  const onSubmit = (values) => {
    console.log(values);
    if (add) {
      addPurchasingProduct({
        ...values,
        invoiceLink,
      }).then((data) => {
        if (data.error) {
          alert('Error ', data.reason);
        } else {
          onCancel();
          navigate('/app/purchase-product/list');
        }
      });
    } else {
      addPurchasingProduct(values).then((data) => {
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

  return (
    <Grid container spacing={gridSpacing} justifyContent='center'>
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={
              !isAddMode
                ? 'Upload Product Purchase Bill'
                : 'Update Product Purchase Bill'
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
            </Grid>
            <br />

            <Formik
              initialValues={add ? initialValues : formValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form autoComplete='off'>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control='select'
                          name='vendorId'
                          label='Vendor Name'
                          options={vendorKeyValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control='select'
                          name='orderBy'
                          label='Order By'
                          options={employeeKeyValue}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormikControl
                          control='select'
                          name='paidBy'
                          label='Paid By'
                          options={employeeKeyValue}
                        />
                      </Grid>
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

export default AddEditPurchaseProduct;
