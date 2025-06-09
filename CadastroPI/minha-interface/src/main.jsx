import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './routes/PrivateRoute'; // Use o componente que já criou
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>
);
