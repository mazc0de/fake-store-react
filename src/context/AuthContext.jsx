import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : null
  );

  const [user, setUser] = useState(() => {
    localStorage.getItem('auth') ? jwtDecode(localStorage.getItem('auth')) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ login: false, message: '' });
  const [loadingButton, setLoadingButton] = useState({ login: false });

  const navigate = useNavigate();

  const loginUser = ({ username, password }) => {
    setError({ ...error, login: false, message: '' });
    setLoadingButton({ ...loadingButton, login: true });
    axios
      .post(`${import.meta.env.VITE_REACT_APP_API_KEY}/auth/login`, {
        username,
        password,
      })
      .then((res) => {
        const decodeToken = jwtDecode(res?.data?.token);
        setToken(res?.data?.token);
        setUser(decodeToken?.user);
        localStorage.setItem('auth', JSON.stringify(`Bearer ${res?.data?.token}`));
        setTimeout(() => {
          setLoadingButton({ ...loadingButton, login: false });
          navigate('/', { replace: true });
        }, 1500);
      })
      .catch((err) => {
        setError({ ...error, login: true, message: err?.response?.data });
        setLoadingButton({ ...loadingButton, login: false });
      });
  };

  useEffect(() => {
    if (token) {
      const decodeToken = jwtDecode(token);
      setUser(decodeToken?.user);
    }
    setLoading(false);
  }, [token, loading]);

  const value = { token, user, loginUser, loadingButton, error };
  return <AuthContext.Provider value={value}>{loading ? null : children}</AuthContext.Provider>;
};

export default AuthContext;
