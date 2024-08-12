import { createProfile } from '@/service/ProfileService';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  error: '',
  loading: false,
  didRedirect: false,
};

export const REGISTER = createAsyncThunk(
  '@profile/REGISTER',
  async (values, thunkAPI) => {
    const response = await createProfile(values);
    return response;
  }
);

export const profileReducer = createSlice({
  name: '@profile',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(REGISTER.fulfilled, (state, action) => {
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
        };
      }
      return action.payload;
    });
  },
});

export default profileReducer.reducer;
