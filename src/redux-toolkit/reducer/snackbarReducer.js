import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  action: false,
  open: false,
  message: "Note archived",
  anchorOrigin: {
    vertical: "bottom",
    horizontal: "right",
  },
  variant: "default",
  alertSeverity: "success",
  transition: "Fade",
  close: true,
  actionButton: false,
};

export const snackbarReducer = createSlice({
  name: "@snackbar",
  initialState,
  reducers: {
    SNACKBAR_OPEN: (state, action) => {
      console.log(action);

      return {
        ...state,
        action: !state.action,
        open: action.payload.open ? action.payload.open : initialState.open,
        message: action.payload.message
          ? action.payload.message
          : initialState.message,
        anchorOrigin: action.payload.anchorOrigin
          ? action.payload.anchorOrigin
          : initialState.anchorOrigin,
        variant: action.payload.variant
          ? action.payload.variant
          : initialState.variant,
        alertSeverity: action.payload.alertSeverity
          ? action.payload.alertSeverity
          : initialState.alertSeverity,
        transition: action.payload.transition
          ? action.payload.transition
          : initialState.transition,
        close:
          action.payload.close === false
            ? action.payload.close
            : initialState.close,
        actionButton: action.payload.actionButton
          ? action.payload.actionButton
          : initialState.actionButton,
      };
    },
  },
});

export const { SNACKBAR_OPEN } = snackbarReducer.actions;

export default snackbarReducer.reducer;
