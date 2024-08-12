import { Button, Grid } from '@mui/material';
import { Stack } from '@mui/system';
import FormikControl from 'component/formik/FormikControl';
import { Form } from 'formik';
import React from 'react';
import { gridSpacing } from 'store/constant';
import AnimateButton from 'ui-component/extended/AnimateButton';

const AddEditCommonCategory = ({ name, label, isAddMode }) => {
  return (
    <Form autoComplete='off'>
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12} sm={5}>
          <FormikControl control='input' label={label} name={name} />
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
};

export default AddEditCommonCategory;
