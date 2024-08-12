import { authenticate } from '@/service/AuthService';
import { login } from '@/service/UserService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  didRedirect: false,
};

export const LOGIN = createAsyncThunk('@user/Login', async (values) => {
  const response = await login(values);
  return response;
});

export const userReducer = createSlice({
  name: '@user',
  initialState,
  reducers: {
    LOGOUT: (state, action) => {
      action.payload.logout();
      action.payload.navigate('/');
      return {
        ...state,
      };
    },
  },

  extraReducers: (builder) => {
    builder.addCase(LOGIN.fulfilled, (state, action) => {
      if (action.payload === undefined) {
        return {
          ...state,
          error: 'Please Check Server Try After Sometime',
          loading: false,
        };
      } else if (action.payload.reason) {
        return {
          ...state,
          error: action.payload.message,
          loading: false,
        };
      } else {
        authenticate(action.payload, () => {});
        return {
          ...state,
          didRedirect: true,
        };
      }
    });
  },
});

export const { LOGOUT, CHANGE_PASSWORD } = userReducer.actions;
export default userReducer.reducer;
