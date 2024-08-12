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
import { addProductCategory } from '@/service/AdminService';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import AddEditCommonCategory from '@/component/common/AddEditCommonCategory';

const AddEditProductCategory = ({ onCancel, formValues }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAddMode = !formValues.id;

  const initialValues = {
    name: '',
  };

  const validationSchema = yup.object({
    name: yup.string().required('Enter a category name'),
  });

  const onSubmit = (values) => {
    addProductCategory({ ...values }).then((data) => {
      console.log('Response ==>  ', data);
      if (data.error) {
        alert('Error ', data.reason);
      } else {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: 'Category Submit Successfully',
            variant: 'alert',
            alertSeverity: 'success',
          })
        );

        onCancel();
      }
    });
  };

  return (
    <Grid container spacing={gridSpacing} justifyContent='center'>
      <Grid item xs={12} md={12} lg={12}>
        <DialogContent sx={{ p: 3 }}>
          <MainCard
            title={isAddMode ? 'Add Category' : 'Update Category'}
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
                  <AddEditCommonCategory
                    name='name'
                    label='Product Category'
                    isAddMode={isAddMode}
                  />
                );
              }}
            </Formik>
          </MainCard>
        </DialogContent>
      </Grid>
    </Grid>
  );
};

export default AddEditProductCategory;
