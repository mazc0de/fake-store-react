import axios from 'axios';

const useAxios = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));

  const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_API_KEY}`,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!auth) {
      window.location.href = '/';
    }
    return req;
  });
  return axiosInstance;
};

export default useAxios;
