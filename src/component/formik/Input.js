import { TextField } from '@mui/material';
import { useField } from 'formik';

const Input = (props) => {
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
    <div>
      <TextField id={name} name={name} label={label} {...configTextField} />
    </div>
  );
};

export default Input;
