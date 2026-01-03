import React from 'react';
import { Navigate } from 'react-router-dom'; // 1. Import Navigate
import { useUser } from '../hooks/useUser';
import Loading from './Loading'

const PrivateRoute = ({ children }) => {
  const { isLoading, isAuthenticated, fetchStatus } = useUser();

  // Guard: If we are loading OR still fetching the user, do nothing but wait.
  if (isLoading || fetchStatus === 'fetching') return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return children;
}

export default PrivateRoute;