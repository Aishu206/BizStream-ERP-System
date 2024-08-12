import React from 'react';
import { useField } from 'formik';
import { useFormikContext } from 'formik';

// --- Material Ui Picker Imports --- //

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const DatePick = (props) => {
  const { label, name, options, ...rest } = props;
  const [field, mata] = useField(name);

  const { setFieldValue } = useFormikContext();

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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          id={name}
          name={name}
          label={label}
          {...configTextField}
          onChange={(value) => {
            return setFieldValue(name, value.$d, true);
          }}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePick;
