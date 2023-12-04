import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';
import { Layout } from './components';
import ProtectedRoute from './hoc/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { Home, Login, Products, ProductCategories, ProductsCategory } from './pages';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/categories" element={<ProductCategories />} />
                <Route path="/products/categories/:category" element={<ProductsCategory />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
