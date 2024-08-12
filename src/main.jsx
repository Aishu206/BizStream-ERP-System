import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

// redux toolkit
import { Provider } from 'react-redux';
import { store, persister } from './redux-toolkit/store';
import 'globalthis/auto';

// load mock apis
import './_mockApis';

// project imports
import * as serviceWorker from './serviceWorker';

// style + assets
import './assets/scss/style.scss';
import config from './config';
import App from './App';

// ==============================|| REACT DOM RENDER  ||============================== //

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <BrowserRouter basename={config.basename}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
