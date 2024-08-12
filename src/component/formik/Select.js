import { MenuItem, TextField } from '@mui/material';
import { useField } from 'formik';
import React from 'react';

const Select = (props) => {
  const { label, name, options, ...rest } = props;
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
    <div>
      <TextField
        id={name}
        name={name}
        label={label}
        select
        {...configTextField}>
        {options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.value}>
              {option.key}
            </MenuItem>
          );
        })}
      </TextField>
    </div>
  );
};

export default Select;
