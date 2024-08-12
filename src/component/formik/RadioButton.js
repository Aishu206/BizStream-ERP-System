import { Field } from 'formik';
import React from 'react';

const RadioButton = (props) => {
  const { label, name, options, ...rest } = props;

  return (
    <div>
      <label className='form-label'>{label}</label>
      <Field className='form-control' name={name} {...rest}>
        {({ field }) => {
          return options.map((option) => {
            return (
              <React.Fragment key={option.key}>
                <input
                  type='radio'
                  id={option.value}
                  {...field}
                  value={option.value}
                  checked={field.value === option.value}
                />
                <label htmlFor={option.value}>{option.value}</label>
              </React.Fragment>
            );
          });
        }}
      </Field>
    </div>
  );
};

export default RadioButton;
