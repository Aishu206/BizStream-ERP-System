import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import FormikControl from './FormikControl';
const FormikContainer = () => {
  const initialValues = {
    email: '',
    birthDate: '',
  };
  const validationSchema = Yup.object({
    email: Yup.string().required('Required'),
    birthDate: Yup.date().required('Required').nullable(),
  });

  const dropdownOptions = [
    { key: 'Select an options', value: '' },
    { key: 'Option 1', value: 'option1' },
    { key: 'Option 2', value: 'option2' },
    { key: 'Option 3', value: 'option3' },
  ];

  onsubmit = (values) => {
    console.log('Form data', values);
    console.log('Saved Data ', JSON.parse(JSON.stringify(values)));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onsubmit}>
      {(formik) => (
        <Form>
          <FormikControl
            control='input'
            type='email'
            name='email'
            label='Email'
          />
          <FormikControl
            control='select'
            label='Select a topic'
            name='selectOption'
            options={dropdownOptions}
          />
          <button type='submit'>Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormikContainer;
