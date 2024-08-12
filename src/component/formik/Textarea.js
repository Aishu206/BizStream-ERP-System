import { TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const Textarea = (props) => {
  const { label, name, ...rest } = props;
  const [field, mata] = useField(name);
  const configTextField = {
    ...field,
    ...rest,
    fullWidth: true,
  };

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  return (
    <TextField
      id={name}
      name={name}
      label={label}
      multiline
      rows={3}
      {...configTextField}
    />
  );
};

export default Textarea;
