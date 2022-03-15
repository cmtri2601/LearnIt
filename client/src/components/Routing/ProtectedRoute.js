import { Navigate, Outlet } from 'react-router-dom';
import { useContext } from 'react';
import Spinner from 'react-bootstrap/Spinner';

import NavbarMenu from '../Layout/NavbarMenu';
import { AuthContext } from '../../Context/auth-context';

const ProtectedRoute = () => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div>
        <Spinner animation='border' variant='info' />
      </div>
    );

  if (!isAuthenticated) return <Navigate to='/login' />;

  return (
    <>
      <NavbarMenu />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
