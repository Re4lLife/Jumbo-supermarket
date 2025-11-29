import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import Loading from './Loading'

const PrivateRoute = ({ children }) => {

  const navigate = useNavigate();
  //Load the authenticated user status
  const { isLoading, isAuthenticated } = useUser();





  if (isLoading) return <Loading />;

  if (!isAuthenticated) {
    navigate('/auth/sign-in', { replace: true });

    return null;
  }


  return children;
}

export default PrivateRoute;