import { persistStore, persistReducer } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from './reducer/userReducer';
import cartReducer from './reducer/userReducer';
import profileReducer from './reducer/profileReducer';
import customizationReducer from './reducer/customizationReducer';
import snackbarReducer from './reducer/snackbarReducer';
import clientReducer from './reducer/clientReducer';
import employeeReducer from './reducer/employeeReducer';
import vendorReducer from './reducer/vendorReducer';
import productDetailsReducer from './reducer/productDetailsReducer';
import editProductReducer from './reducer/editProductReducer';
import transportReducer from './reducer/transportReducer';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    profile: profileReducer,
    art: persistReducer(
      { key: 'cart', storage, keyPrefix: 'berry-' },
      cartReducer
    ),
    customization: customizationReducer,
    snackbar: snackbarReducer,
    client: clientReducer,
    employee: employeeReducer,
    vendor: vendorReducer,
    productDetials: productDetailsReducer,
    editProduct: editProductReducer,
    transportReducer:transportReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);
