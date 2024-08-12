import { Button, DialogContent, Grid, Stack } from '@mui/material';
import FormikControl from '@/component/formik/FormikControl';
import { Form, Formik } from 'formik';
import { gridSpacing } from '@/store/constant';
import MainCard from '@/ui-component/cards/MainCard';
import AnimateButton from '@/ui-component/extended/AnimateButton';
import * as yup from 'yup';

// assets
import LinkIcon from '@mui/icons-material/Link';
import SecondaryAction from '@/ui-component/cards/CardSecondaryAction';

import { useDispatch } from 'react-redux';
import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';

const AddEditCategory = ({
  onCancel,
  formValues,
  serviceFunctionAdd,
  label,
  inputName,
  serviceFunctionUpdate,
}) => {
  const dispatch = useDispatch();

  const isAddMode = !formValues.id;

  const initialValues = {
    inputName: '',
  };

  const validationSchema = yup.object({
    [inputName]: yup.string().required(`Enter a category name`),
  });

  const onSubmit = (values) => {
    console.log(values);
    if (isAddMode) {
      serviceFunctionAdd({ ...values }).then((data) => {
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
    } else {
      serviceFunctionUpdate({ ...values }).then((data) => {
        if (data.reason) {
          dispatch(
            SNACKBAR_OPEN({
              open: true,
              message: data.message,
              variant: 'alert',
              alertSeverity: 'error',
            })
          );
        } else {
          dispatch(
            SNACKBAR_OPEN({
              open: true,
              message: 'Submit Success',
              variant: 'alert',
              
              alertSeverity: 'success',
            })
          );

          onCancel();
        }
      });
    }
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
                  <Form autoComplete='off'>
                    <Grid container spacing={gridSpacing}>
                      <Grid item xs={12} sm={5}>
                        <FormikControl
                          control='input'
                          label={label}
                          name={inputName}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Stack direction='row' justifyContent='flex-end'>
                          <AnimateButton>
                            <Button variant='contained' type='submit'>
                              {isAddMode ? 'Submit' : 'Update'}
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

export default AddEditCategory;
