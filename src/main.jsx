import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import { Home, Login } from './pages';
import { Layout } from './components';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
