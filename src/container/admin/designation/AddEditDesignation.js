import { DialogContent, Grid } from '@mui/material';
import { Formik } from 'formik';
import * as yup from 'yup';

// assets
import LinkIcon from '@mui/icons-material/Link';

import { useDispatch } from 'react-redux';
import { addDesignation } from '@/service/AdminService';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AddEditCommonCategory from '@/component/common/AddEditCommonCategory';
import CardSecondaryAction from '@/ui-component/cards/CardSecondaryAction';

const AddEditDesignation = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();

  const isAddMode = !formValues.id;

  const initialValues = {
    designation: '',
  };

  const validationSchema = yup.object({
    designation: yup.string().required('Enter a designation value'),
  });

  const onSubmit = (values) => {
    addDesignation({ ...values }).then((data) => {
      console.log('Response ==>  ', data);
      if (data.error) {
        alert('Error ', data.reason);
      } else {
        dispatch(
          SNACKBAR_OPEN({
            open: true,
            message: 'Designation Added Successfully',
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
            title={isAddMode ? 'Add Designation' : 'Update Designation'}
            secondary={
              <CardSecondaryAction
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
                    name='designation'
                    label='Designation'
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

export default AddEditDesignation;
