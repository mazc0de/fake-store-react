const useAxios = () => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  const axiosInstance = axios.create({
    baseUrl: import.meta.env.VITE_REACT_APP_API_KEY,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${auth}`,
    },
    withCredentials: false,
  });

  axiosInstance.interceptors.request.use(async (req) => {
    if (!auth) {
      window.location.href = '/';
    }
    return req;
  });
};

export default useAxios;
