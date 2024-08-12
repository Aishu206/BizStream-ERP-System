import { Checkbox } from '@mui/material';

import Input from './Input';
import RadioButton from './RadioButton';
import Select from './Select';
import Textarea from './Textarea';
import DatePick from './DatePicker';

const FormikControl = (props) => {
  const { control, ...rest } = props;

  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
      return <Textarea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <RadioButton {...rest} />;
    case 'checkbox':
      return <Checkbox {...rest} />;
    case 'date':
      return <DatePick {...rest} />;
    default:
      return null;
  }
};

export default FormikControl;
