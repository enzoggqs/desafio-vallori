import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { Provider } from 'react-redux'
import store from './store'

import AppRoutes from './routes';

import Box from '@mui/material/Box';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div style={{ height:'100%', backgroundImage: `linear-gradient(to right, rgba(255, 170, 197), rgba(188, 230, 255))`, }}>
      <Provider store={store}>
        <AppRoutes />
      </Provider>
    </div>
  </React.StrictMode>
);

