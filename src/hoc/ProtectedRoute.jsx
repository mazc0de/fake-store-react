import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {
  const auth = localStorage.getItem(`auth`);
  if (!auth) {
    return <Navigate to="login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
