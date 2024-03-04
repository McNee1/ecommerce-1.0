import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from './app/index.tsx';
import '@/app/style/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider />
  </React.StrictMode>
);
