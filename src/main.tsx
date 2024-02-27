import '@/app/style/index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from './app/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider />
  </React.StrictMode>
);
