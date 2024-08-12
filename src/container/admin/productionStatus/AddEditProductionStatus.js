import { DialogContent, Grid } from '@mui/material';
import { Formik } from 'formik';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import * as yup from 'yup';

// assets
import LinkIcon from '@mui/icons-material/Link';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';
import { addProductionStatus } from '@/service/AdminService';
import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';
import AddEditCommonCategory from '@/component/common/AddEditCommonCategory';

const AddEditProductionStatus = ({ onCancel, formValues }) => {
  const dispatch = useDispatch();

  const isAddMode = !formValues.id;

  const initialValues = {
    stage: '',
  };

  const validationSchema = yup.object({
    status: yup.string().required('Enter a production status name'),
  });

  const onSubmit = (values) => {
    console.log({ ...values });
    addProductionStatus({ ...values }).then((data) => {
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
            title={
              isAddMode ? 'Add Production Stage' : 'Update Production Stage'
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
                  <AddEditCommonCategory
                    name='stage'
                    label='Production Status'
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

export default AddEditProductionStatus;
