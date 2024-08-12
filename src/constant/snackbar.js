import { SNACKBAR_OPEN } from '@/redux-toolkit/reducer/snackbarReducer';

export const successSnackbar = (message) => {
  SNACKBAR_OPEN({
    open: true,
    message: message,
    variant: 'alert',
    alertSeverity: 'success',
  });
};

export const errorSnackbar = (message) => {
  SNACKBAR_OPEN({
    open: true,
    message: message,
    variant: 'alert',
    alertSeverity: 'error',
  });
};

export const warningSnackbar = (message) => {
  SNACKBAR_OPEN({
    open: true,
    message: message,
    variant: 'alert',
    alertSeverity: 'warning',
  });
};
