import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterConfig } from './RouterConfig';
import { ThemeProvider } from '../shared/context/ThemeContext';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterConfig />
    </ThemeProvider>
  </React.StrictMode>
);
