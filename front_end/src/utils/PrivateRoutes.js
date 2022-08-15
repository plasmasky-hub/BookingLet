import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
  let auth = localStorage.getItem('token');
  return auth ? (
    <Outlet />
  ) : (
    <Navigate to="/error" state={'Please log in first!'} />
  );
};
export default PrivateRoutes;
